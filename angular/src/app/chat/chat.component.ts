import { Component, OnInit, ViewChildren, QueryList, isDevMode, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent, MatTabNav } from '@angular/material/tabs';

import { ExpansionPanels } from '@google/glue/lib/expansionpanels';

import { v4 as uuidv4 } from 'uuid';

import { ActionCardCategoryConfig, ActionCardConfig, AnalyticsService, AuthService, BrandConfig, CardCategoryType, ComplianceClaimsConfig, ConfigService, LanguageConfig, VoiceConfig, VoiceLocaleConfig } from "../services"

import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomCardEditDialogComponent } from './custom-card-edit-dialog/custom-card-edit-dialog.component';
import { GoogleDriveService } from '../services/google-drive.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WidgetDialogComponent } from './widget-dialog/widget-dialog.component';

// server-side endpoints for prompt requests, image requests and feedback
const SEND_MESSAGE_ENDPOINT = "/send_message";
const SEND_IMAGE_REQUEST_ENDPOINT = "/send_image_request";
const SEND_AUDIO_REQUEST_ENDPOINT = "/send_audio_request";
const SEND_RESPONSE_FEEDBACK = "/feedback";

// error message to display if the generative model request fails
const GENERATIVE_ERROR_MESSAGE = "<p>Oops! I wasn't able to process your request. Could please try again?</p><p>If you are experiencing repeated issues, please let us know by submitting <a href='/feedback' target='_blank'>feedback</a>.</p>";

// define the voice types which are considered premium for highlighting in the UI
const PREMIUM_VOICE_TYPES : string[] = ['WaveNet', 'Neural2', 'Casual', 'Journey', 'News', 'Polyglot', 'Studio'];

// set default voice (TODO: add default voice selection to admin dashboard)
const VOICE_DEFAULT_LOCALE = 'en-US';
const VOICE_DEFAULT_TYPE = 'Studio';

@Pipe({name: 'voiceNameTransform'})
export class VoiceNameTransform implements PipeTransform {
  transform(value: string) {
    return value.split('-')[2] + ' ' + value.split('-')[3];
  }
}

@Pipe({name: 'voiceQualityTransform'})
export class VoiceQualityTransform implements PipeTransform {
  transform(value: string) {
    if (PREMIUM_VOICE_TYPES.includes(value))
      return "spark";
    else
      return "";
  }
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(html: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

enum WidgetType {
  PrePrompt,
  PostPrompt
}

export class WidgetState {
  type: WidgetType = WidgetType.PrePrompt;
  name: string;
  step: number = 1;
  repeated: boolean = false;
  variables: { [name: string]: string };
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
/**
 * Handles chat session with the user, including retrieving responses from the backend system.
 */
export class ChatComponent implements OnInit {

  // list of messages between the user and the chat agent
  public messages: any[] = []; /* TODO: fix!! */

  // new message being staged by the user
  public newMessage: string = '';

  sessionId: string;
  botMessageIndex: number = 0;
  
  animatingNav: boolean = false;

  public selectedTabIndex: number;

  public currentBrand: BrandConfig;

  public currentLanguage: LanguageConfig;
  
  public currentVoice: VoiceConfig;
  public currentVoiceLocale: VoiceLocaleConfig;

  public currentActionCardCategory: ActionCardCategoryConfig;
  public currentActionCard: ActionCardConfig | null;

  public panelDisplay: boolean;
  public panelEmbeddedDocId: string | null = null;
  public panelEmbeddedDocUrl: string | null = null;

  public widgetState: WidgetState;
  public currentWidgetConfig: WidgetConfig | null = null;

  public get CardCategoryType() {
    return CardCategoryType; 
  }

  // used to subscribe to message changes
  @ViewChildren('messages') messagesQueryList: QueryList <any> ;

  constructor(private http: HttpClient, private analyticsService: AnalyticsService, public dialog: MatDialog, 
    public authService: AuthService, private snackBar: MatSnackBar, public configService: ConfigService, 
    public app: AppComponent, private errorService: GlobalErrorHandlerService, private voiceNameTransform: VoiceNameTransform,
    private sanitizer: DomSanitizer, public driveService: GoogleDriveService) { }

  /**
   * On component init.
   */
  ngOnInit(): void {

    // start a new chat session
    this.startNewSession();

    // push welcome message to the user
    this.messages.push({type: 'app', text: this.configService.config.welcomeMessage});

    // set the first action card category as the default
    this.currentActionCardCategory = this.configService.config.actionCardCategoryConfig[0];

    // set the brand and language config to the default, and if a user logs in, look up their persisted setting
    this.currentBrand = this.configService.config.brandConfig[0];
    this.currentLanguage = this.configService.config.languageConfig[0];
    this.currentVoiceLocale = this.configService.config.voiceConfig.find((item) => item.locale === VOICE_DEFAULT_LOCALE)!;
    this.currentVoice = this.currentVoiceLocale.voiceConfig.find((item) => item.type === VOICE_DEFAULT_TYPE)!;
    
    this.authService.signedInStateChanged.subscribe({
      next: (signedIn: boolean) => {
        if (signedIn) {

          if (this.configService.userConfig && this.configService.userConfig.brandConfigName) {
            let result: BrandConfig | null = null;
            for (let brandConfig of this.configService.config.brandConfig) {
              result = this.findBrandConfig(this.configService.userConfig.brandConfigName, brandConfig);
              if (result) break;
            }
            if (result) this.currentBrand = result;
          }

          if (this.configService.userConfig && this.configService.userConfig.languageConfigCode) {
            let languageConfig = this.configService.config.languageConfig.find((language) => { return language.code === this.configService.userConfig.languageConfigCode});
            if (languageConfig) this.currentLanguage = languageConfig;
          }

          if (this.configService.userConfig && this.configService.userConfig.voiceLocaleConfigName && this.configService.userConfig.voiceConfigName) {
            let currentVoiceLocale = this.configService.config.voiceConfig.find((item) => item.name === this.configService.userConfig.voiceLocaleConfigName);
            let currentVoice;
            if (currentVoiceLocale)
              currentVoice = currentVoiceLocale.voiceConfig.find((item) => item.name === this.configService.userConfig.voiceConfigName);
            if (currentVoiceLocale && currentVoice) {
              this.currentVoiceLocale = currentVoiceLocale;
              this.currentVoice = currentVoice;
            }
          }

        }
      }
    });
  }

  /**
   * Recursively search for a matching Brand Config by name.
   */
  findBrandConfig(name: string, brandConfig: BrandConfig) : BrandConfig | null {
    var i, currentBrandConfig, result;
    if (name === brandConfig.name) {
        return brandConfig;
    }
    else if (brandConfig.subBrandConfig) {
      for (i = 0; i < brandConfig.subBrandConfig.length; i += 1) {
          currentBrandConfig = brandConfig.subBrandConfig[i];
          result = this.findBrandConfig(name, currentBrandConfig);
          if (result) return result;
      }
      return null;
    }
    else {
      return null;
    }
  }


  /**
   * After the view is available
   */
  ngAfterViewInit() {

    // subscribe the message change events and automatically scroll to the bottom
    this.messagesQueryList.changes.subscribe(t => {
      this.scrollToBottom();
    })

    // initialize glue expansion panels
    const panelGroupEl = document.querySelector<HTMLElement>('.glue-expansion-panel');
    if (panelGroupEl) new ExpansionPanels(panelGroupEl);

    // initialize chat navigation, including auto-collapse behavior after scolling past a threshold
    const chatNavEl = document.getElementById('chat-navigation');

    chatNavEl?.addEventListener("mouseover", (event) => {
      if (!this.animatingNav)
        chatNavEl?.classList.add("expanded");
    });

    chatNavEl?.addEventListener("mouseout", (event) => {
      chatNavEl?.classList.remove("expanded");
    });

  }

  /**
   * Occurs when the user changes the navigationt tab.
   * 
   * @param tabChangeEvent 
   */
  public navTabChanged(tabChangeEvent: MatTabChangeEvent): void {

    // if we navigate to the custom tab, generate a dummy category card config
    if (tabChangeEvent.index >= this.configService.config.actionCardCategoryConfig.length) {
      this.currentActionCardCategory = { 
        "name": "test",
        "iconSymbolName": "edit",
        "type": CardCategoryType.Text,
        "disableComplianceMessages": false,
        "actionCardConfig": []
      }
    }
    else {
      this.currentActionCardCategory = this.configService.config.actionCardCategoryConfig[tabChangeEvent.index];
    }

    this.analyticsService.trackEvent('click', 'tab', '' + tabChangeEvent.index);
  }
  
  /**
   * Send a prompt to the appropriate model.
   * 
   * @param prompt user prompt to send
   * @param type the card category type to determine the appropriate model
   */
  public sendRequest(prompt: string, type: CardCategoryType) {
    if (type === CardCategoryType.Text)
      this.sendTextRequest(prompt);
    else if (type === CardCategoryType.Image)
      this.sendImageRequest(prompt);
    else if (type === CardCategoryType.Audio)
      this.sendAudioRequest(prompt);
  }


  /**
   * Send a prompt to the image model and display a response.
   * 
   * @param prompt user prompt to send to the image model
   */
  private sendImageRequest(prompt: string): void {

    this.messages.push({type: 'user', text: prompt.replace(/\n/g, '<br/>')});
    this.http.post<ImageResponse>(environment.service_prefix + SEND_IMAGE_REQUEST_ENDPOINT, { message: prompt }).subscribe({
      next: (data) => {
        this.messages.pop();
        if (data.status == 'success') {
          this.messages.push({type: 'botImage', text: '', image1: data.image1, image2: data.image2, image3: data.image3, image4: data.image4, originalPrompt: prompt});
        }
        else {
          this.messages.push({type: 'app', text: data.errorMessage});
        }
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
    this.messages.push({type: 'loading', text: '<div class="skeleton-loader-1"></div><div class="skeleton-loader-2"></div>'})
    this.newMessage = '';

    this.analyticsService.trackEvent('submit', 'chat', 'image')
  }

  /**
   * Send a prompt to the language model and display a response.
   * 
   * @param prompt user prompt to send to the language model
   */
  private sendTextRequest(prompt: string): void {

    if (!prompt || prompt.trim().length == 0)
      return;

    let rawGoLinks = prompt.match(/(?<=go\/)[a-zA-Z0-9_-]+\b/g);
    if (rawGoLinks) {
      this.snackBar.open("I'm sorry, I can't process go/ links yet. " +
        "Instead, please copy/paste the full URL to the document that you want to process. " +
        "I can process Google docs, spreadsheets, and presentations.", "Close");
      return;
    }

    // extract google drive document ids from a message
    let driveDocIds: string[] = [];
    let rawDriveLinks = prompt.match(/(?<=(?<=document|spreadsheets|presentation)\/d\/)[^? \n\r\t]*/g);
    if (rawDriveLinks) rawDriveLinks?.forEach(idFragment => {
      if (idFragment !== null) {
        let id = idFragment.split('/')[0];
        driveDocIds.push(id);
      }
    });

    // strip links from prompt
    if (rawDriveLinks) {
      prompt = prompt.replace(/https:\/\/docs\.google\.com\/\S+/gi, '');
    }

    // if there are doc links present in the prompt
    if (driveDocIds.length > 0) {

      this.newMessage = "";

      // ensure we have access to Google Drive
      this.authService.ensureDriveAccess().then((value) => {
        this.authService.googleAccessToken = value;
        
        // process the drive files
        this.driveService.processDriveFiles(driveDocIds).then((fileMetadata) => {

          // send the prompt and docs to the model
          this.processPrompt(prompt, true, true, true, this.driveService.processingFileMetadata);
        })
        .catch((error) => this.errorService.handleError(error));
      });
      
    }
    else {
      // no doc links in the prompt, send the prompt to the model
      this.processPrompt(prompt, true, true, true, this.driveService.processingFileMetadata);
    }
  }

  /**
   * Send a prompt to the audio model and display a response.
   * 
   * @param prompt user prompt to send to the language model
   */
  private sendAudioRequest(prompt: string): void {
    this.messages.push({type: 'user', text: prompt.replace(/\n/g, '<br/>')});
    this.http.post<AudioResponse>(environment.service_prefix + SEND_AUDIO_REQUEST_ENDPOINT, { 
      message: prompt,
      locale: this.currentVoiceLocale.locale,
      gender: this.currentVoice.gender,
      name: this.currentVoice.name
    }).subscribe({
      next: (data) => {
        this.messages.pop();
        if (data.status == 'success') {
          this.messages.push({type: 'botAudio', text: '', audio: data.audio, originalPrompt: prompt});
        }
        else {
          this.messages.push({type: 'app', text: data.errorMessage});
        }
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
    this.messages.push({type: 'loading', text: '<div class="skeleton-loader-1"></div><div class="skeleton-loader-2"></div>'})
    this.newMessage = '';

    this.analyticsService.trackEvent('submit', 'chat', 'audio')
  }

  /**
   * Occurs when a user selects an action card.
   * 
   * @param actionCard The selected action card.
   */
  public cardSelected(actionCard: ActionCardConfig) {

    this.currentActionCard = actionCard;

    this.widgetState = new WidgetState();

    this.handleActionCard(actionCard);

    this.animatingNav = true;
    setTimeout(() => {
      this.animatingNav = false;
    }, 300);

    const chatNavEl = document.getElementById('chat-navigation');
    chatNavEl?.classList.remove("expanded");
  }


  /**
   * Handle action card selection.
   * 
   * @param actionCard
   */
  private handleActionCard(actionCard: ActionCardConfig): void {

    // reset widget config and panels
    this.currentWidgetConfig = null;
    this.widgetState = new WidgetState();
    this.panelDisplay = false;
    this.panelEmbeddedDocId = null;
    this.panelEmbeddedDocUrl = null;
  
    // push relevant compliance messages
    if (actionCard.complianceMessage)
      this.messages.push({type: 'info', text: actionCard.complianceMessage});

    // push relevant app messages
    if (actionCard.userMessage && actionCard.userMessage.trim().length > 0) {
      this.messages.push({type: 'app', text: actionCard.userMessage});
    }

    // executed widgets, if applicable
    if (actionCard.widgetConfig) {
      try {
        this.currentWidgetConfig = <WidgetConfig>JSON.parse(actionCard.widgetConfig);
      } catch (e) {
        this.errorService.handleError(e);
        return;
      }

      this.processWidgetSteps(this.currentWidgetConfig);
    }
    
    // if we've selected a text LLM action, process the prompt
    if (this.currentActionCardCategory.type == CardCategoryType.Text) {

      this.processPrompt(actionCard.systemPrompt, false, false, 
        (actionCard.systemPrompt && actionCard.widgetConfig) ? false : true, undefined, actionCard.showUploadHint);
        
    }
    
    this.analyticsService.trackEvent('click', 'card', actionCard.name);
  }


  /**
   * Process widget steps after action card selection.
   * 
   * @param widgetConfig 
   */
  private processWidgetSteps(widgetConfig: WidgetConfig | null) {

    if (!widgetConfig)
      return;

    let widgetSteps = widgetConfig.widgets;

    // if we have widget steps to complete, push them to the UI
    if (this.widgetState.step <= widgetSteps.length) {

      let widgetStep: WidgetStep = widgetSteps[this.widgetState.step - 1];
      
      // push the widget message to the UI (but only once in this session)
      if (widgetStep.message && !this.widgetState.repeated) {
        this.messages.push({type: 'app', text: widgetStep.message});
        if (widgetStep.repeat)
          this.widgetState.repeated = true;
      }

      // ensure widget options are enabled (important for repeating widgets)
      widgetStep.widgetActions.forEach((value) => { value.disabled = false; });

      // push the widget action configuration to render widget UI
      if (widgetStep.widgetActions) {
        this.messages.push({type: 'widget', widgetActions: widgetStep.widgetActions});
      }
    }

  }


  /**
   * Handle click events from widgets based on the widget type and configuration.
   * 
   * @param action 
   */
  public widgetActionHandler(selectedWidgetAction: WidgetAction, allWidgetActions: WidgetAction[]) {

    if (selectedWidgetAction.action.type === "popup") {

      this.dialog.open(WidgetDialogComponent, { data: selectedWidgetAction.action }).afterClosed().subscribe(result => {
        if (result) {
          
          if (this.currentActionCard && this.currentActionCard.templateFileId && this.currentActionCard.templateFileName)
          {
            let templateFileName = this.currentActionCard.templateFileName.replaceAll('{' + result.variable + '}', result.inputValue);
            this.panelDisplay = true;
            this.driveService.copyFile(this.currentActionCard.templateFileId, templateFileName, (response) => {
              this.panelEmbeddedDocId = response.result.id;
              this.panelEmbeddedDocUrl = 'https://docs.google.com/document/d/' + this.panelEmbeddedDocId + '/edit?embedded=true';
            });

          }
          
          this.widgetState.step++;
          this.processWidgetSteps(this.currentWidgetConfig);

        }
      });

    } 
    else if (selectedWidgetAction.action.type === "picker") {

      this.messages.push({type: 'app', text: 'This feature is coming soon.'});
    
    } 
    else if (selectedWidgetAction.action.type === "prompt" && selectedWidgetAction.action.prompt) {

      // if there's a panel document open, include it in the prompt
      if (this.panelEmbeddedDocId) {
      
        // process the drive files
        this.driveService.processDriveFiles([this.panelEmbeddedDocId]).then((fileMetadata) => {
         
          // send the prompt and docs to the model
          this.processPrompt(selectedWidgetAction.action.prompt!, false, false, true, this.driveService.processingFileMetadata);

        }).catch((error) => this.errorService.handleError(error));
      
      } else {

        // there's no panel document open, submit the prompt without document attachments
        this.processPrompt(selectedWidgetAction.action.prompt, false, false, true); // TODO: drive includeBrandPrompt using config

      }
    
    }

    allWidgetActions.forEach(value => { value.disabled = true; });
  }

  /**
   * Get the system prompt by combining the base system prompt, the current brand system prompt, and language preferences.
   * 
   * @returns system prompt to send to the language model on each request
   */
  private getSystemPrompt(): string {
    let prompt = this.configService.config.systemPrompt + "\m\n" + this.currentBrand.systemPrompt;
    if (this.currentLanguage)
      prompt += "\n\n" + "Respond to me in the " + this.currentLanguage.name + " language going forward.";
    return prompt;
  }

  /**
   * Send a prompt to the backend service and display it's response.
   * @param prompt 
   * @param displayPromptToUser
   * @param includeSystemPrompt
   * @param documents 
   */
  private processPrompt(prompt: string, displayPromptToUser: boolean, includeSystemPrompt: boolean, showResponse: boolean, documents?: any[], showUploadHint?: boolean): void {

    // if we aren't sending a prompt but are processing documents, include the document processing prompt in the request
    let finalPrompt = prompt;
    if ((!prompt || prompt.length == 0 || prompt.trim().length == 0) && documents)
      finalPrompt = "Process this document."

    // request objhect that defines the prompt that is sent to the backend system
    let request = {
      message: finalPrompt, 
      sessionId: this.sessionId
    };

    // message object that defines the prompt as it appears in the UI; if we are displaying the prompt to the user, include it in the message
    let message = {
      type: 'user'
    }
    if (displayPromptToUser)
      message["text"] = prompt.replace(/\n/g, '<br/>');

    // add system prompt if it should be included (e.g. brand / creative requests)
    if (includeSystemPrompt)
      request["systemPrompt"] = this.getSystemPrompt();

    if (documents)
    {
      // ensure all documents are loaded
      documents.forEach(document => {
        if (!document.loaded) {
          this.errorService.handleError("Documents are not loaded.");
          return;
        }
      });

      // convert to an array of document urls
      let driveDocUris: string[] = [];
      documents.forEach(document => { driveDocUris.push(document.processingFileUri) } );

      // add documents to request
      request["documents"] = driveDocUris;
      message["documents"] = documents;

      this.driveService.processingFileMetadata = [];
    }

    // display the message in the app UI if there's a message or document to display
    if (message && ((message['documents'] && message['documents'].length > 0) || (message['text'] && message['text'].trim().length > 0)))
      this.messages.push(message);

    // display a skeleton loader
    if (showResponse)
      this.messages.push({type: 'loading', text: '<div class="skeleton-loader-1"></div><div class="skeleton-loader-2"></div>'})

    // send the prompt request to the backend system and display results
    this.http.post<Response>(environment.service_prefix + SEND_MESSAGE_ENDPOINT, request).subscribe({
      next: (data) => {
        if (data.status === "error") {
          
          this.messages.push({type: 'app', text: GENERATIVE_ERROR_MESSAGE});
          this.errorService.handleError(data.errorMessage);

        } else if (showResponse) {

          this.messages.pop();
          this.messages.push({type: 'bot', text: data.response, botMessageIndex: this.botMessageIndex, uploadHint: showUploadHint});
          this.botMessageIndex++;

          this.processWidgetSteps(this.currentWidgetConfig);

          this.displayClaimsComplianceMessages(data.response);
        }
      },
      error: (error) => {
        this.messages.pop();
        this.messages.push({type: 'app', text: GENERATIVE_ERROR_MESSAGE});
        this.errorService.handleError(error);
      }
    });

    // clear the message input box
    this.newMessage = '';

    this.analyticsService.trackEvent('submit', 'chat', 'message')
  }

  private displayClaimsComplianceMessages(modelResponse: string) {
    if (!this.currentActionCardCategory.disableComplianceMessages) {
      const claims = this.configService.config.complianceConfig.complianceClaimsConfig;
      claims.forEach(claim => {
        const termsArray = (<ComplianceClaimsConfig> claim).problematicTerms.split(',').map(term => { return term.toLowerCase().trim(); });
        if (termsArray.some(term => { return new RegExp('\\b' + term + '\\b').test(modelResponse.toLowerCase()); })) {
          if (claim.complianceMessage && claim.complianceMessage.trim().length > 0) 
            this.messages.push({type: 'info', text: claim.complianceMessage});
          return;
        }
      });
    }
  }

  public selectBrand(brand: BrandConfig) {
    this.currentBrand = brand;

    // persist setting change to user config
    if (this.authService.user && this.authService.user.uid) {
      this.configService.userConfig.brandConfigName = brand.name;
      this.configService.saveUserConfig(this.authService.user.uid);
    }

    setTimeout(() => {
      this.messages.pop();
      this.messages.push({type: 'app', text: "Ok! I'll use the " + brand.name + " style & tone when writing copy."});
    }, 1000);

    this.messages.push({type: 'loading', text: '<div class="skeleton-loader-1"></div><div class="skeleton-loader-2"></div>'});
  }

  public selectVoice(voice: VoiceConfig) {
    this.currentVoice = voice;
    this.currentVoiceLocale = this.configService.config.voiceConfig.find((item) => item.locale === voice.locale)!;

    // persist setting change to user config
    if (this.authService.user && this.authService.user.uid) {
      this.configService.userConfig.voiceConfigName = this.currentVoice.name;
      this.configService.userConfig.voiceLocaleConfigName = this.currentVoiceLocale.name;
      this.configService.saveUserConfig(this.authService.user.uid);
    }
    
    setTimeout(() => {
      this.messages.pop();
      this.messages.push({type: 'app', text: "Ok! I'll use the " + this.voiceNameTransform.transform(voice.name) + " voice when generating audio."});
    }, 1000);

    this.messages.push({type: 'loading', text: '<div class="skeleton-loader-1"></div><div class="skeleton-loader-2"></div>'});
  }

  public selectLanguage(language: LanguageConfig) {
    this.currentLanguage = language;

    // persist setting change to user config
    if (this.authService.user && this.authService.user.uid) {
      this.configService.userConfig.languageConfigCode = language.code;
      this.configService.saveUserConfig(this.authService.user.uid);
    }

    setTimeout(() => {
      this.messages.pop();
      this.messages.push({type: 'app', text: "Ok! I'll use " + language.name + " in responses going forward."});
    }, 1000);

    this.messages.push({type: 'loading', text: '<div class="skeleton-loader-1"></div><div class="skeleton-loader-2"></div>'});
  }

  public startNewSession() {

    this.sessionId = uuidv4()
    this.messages = []
    this.botMessageIndex = 0

    this.driveService.processingFileMetadata = [];

    this.widgetState = new WidgetState();
    this.currentWidgetConfig = null;

    setTimeout(() => {
      this.scrollToTop();
    }, 200);

    if (isDevMode())
      console.log("CHAT SESSION ID: " + this.sessionId)

    this.analyticsService.trackEvent('click', 'refresh', 'refresh')
  }

  public removeFile() {
    this.driveService.processingFileMetadata = [];
  }

  public downloadImage(image: string): void {
    let complianceMessage = this.configService.config.complianceConfig.imageDownloadComplianceMessage;
    if (complianceMessage && complianceMessage.trim().length > 0) 
      this.messages.push({type: 'info', text: complianceMessage});

    var link = document.createElement("a");
    link.download = 'gemini-marketing-image';
    link.href = 'data:image/png;base64,' + image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.analyticsService.trackEvent('click', 'image', 'download');
  }

  public downloadAudio(audio: string): void {
    let complianceMessage = this.configService.config.complianceConfig.audioDownloadComplianceMessage;
    if (complianceMessage && complianceMessage.trim().length > 0) 
      this.messages.push({type: 'info', text: complianceMessage});

    this.analyticsService.trackEvent('click', 'audio', 'download');
  }

  /**
   * Generate additional images based on a prior prompt.
   * 
   * @param prompt User prompt to use to generate additional images.
   */
  generateMoreImages(prompt: string): void {

    // if we've navigated off of image generation, set the tab back to image gen
    /*let index = 1;
    this.configService.config.actionCardCategoryConfig.forEach(actionCardCategory => {
      if (actionCardCategory.isImageGeneration) {
        this.selectedTabIndex = index - 1;
      }
      index++;
    });*/

    // send the image generation request
    this.sendImageRequest(prompt);
    
    this.analyticsService.trackEvent('click', 'image', 'generateMoreImages')
  }

  trackExternalLink(name: string) {
    this.analyticsService.trackEvent('click', 'external', name)
  }

  scrollToTop(): void {
    let chat = document.getElementById("chat-conversation");
    chat!.scrollTo({left: 0, top: 0, behavior: "instant"});
  }

  scrollToBottom(): void {

    // wait until paint and scroll to the message
    setTimeout(() => {
      let chat = document.getElementById("chat-conversation");
      chat!.scrollTo({left: 0, top: chat!.scrollHeight, behavior: "smooth"});
    },
    200);
  }

  sendFeedback(message: Message, feedback: string): void {
    if (feedback == 'positive' || feedback == 'negative') {
      if (feedback == 'positive') {
        message.thumbsUpSelected = true;
        message.thumbsDownSelected = false;
      }
      else {
        message.thumbsDownSelected = true;
        message.thumbsUpSelected = false;
      }

      this.http.post<Response>(environment.service_prefix + SEND_RESPONSE_FEEDBACK, { botMessageIndex: message.botMessageIndex, feedback: feedback, sessionId: this.sessionId }).subscribe({
        next: (data) => { },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }

    this.analyticsService.trackEvent('click', 'feedback', feedback)
  }

  copyText(message: Message): void {

    message.copySelected = true;
    setTimeout(() => {
      message.copySelected = false;
    }, 400);

    function listener(e: any) {
      e.clipboardData.setData("text/html", message.text);
      e.clipboardData.setData("text/plain", message.text);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    this.analyticsService.trackEvent('click', 'copy', '')
  }

  openDriveFilePicker(): void {
    this.driveService.openDrivePicker();
  }

  public editCustomPrompt(card?: ActionCardConfig) {

    if (!this.authService.user || !this.authService.user.uid) {
      
      // ensure we are logged in
      this.authService.ensureDriveAccess().then((value) => {
        this.openCustomPromptDialog(card);
      }).catch((error) => this.errorService.handleError(error));
    }
    else {
      this.openCustomPromptDialog(card);
    }
  }

  private openCustomPromptDialog(card?: ActionCardConfig) {
    if (this.authService.user && this.authService.user.uid) {
      let isNew: boolean = false;
      if (!card) isNew = true;
      let a = this.dialog.open(CustomCardEditDialogComponent, { data: card }).afterClosed().subscribe(result => {
        if (result) {
          if (isNew) {
            if (!this.configService.userConfig.actionCardConfig)
              this.configService.userConfig.actionCardConfig = [];
            this.configService.userConfig.actionCardConfig.push(result);
          }
          this.configService.saveUserConfig(this.authService.user.uid);
        }
      });
    } else {
      this.errorService.handleError('editCustomPrompt(): User object is missing');
    }
  }  

  public openDocInNewWindow(url: string) {
    window.open(url);
    this.analyticsService.trackEvent('open', 'doc', url);
  }

}

/* Model Requests */

interface ModelRequest {
  type: string;
  text: string;

  originalPrompt?: string;
  botMessageIndex?: number;
  thumbsDownSelected? : boolean;
  thumbsUpSelected? : boolean;
  copySelected? : boolean;
}

interface LanguageModelRequest extends ModelRequest {
  documents: Document[];
}

interface ImageModelRequest extends ModelRequest {
  images: string[];
}

interface Document {
  name: string;
  icon: string;
  thumbnail: string;
  uri: string;
}


/* Model Resonses */

interface ModelResponse {
  originalPrompt?: string;
  botMessageIndex?: number;
  thumbsDownSelected? : boolean;
  thumbsUpSelected? : boolean;
  copySelected? : boolean;
}

interface LanguageModelResponse extends ModelResponse {

}

interface ImageModelResponse extends ModelResponse {
  images: string[];
}


/* Legacy */

interface Message {
  type: string;
  text: string;

  uploadHint?: boolean;
  
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  
  originalPrompt?: string;
  
  botMessageIndex?: number;
  
  thumbsDownSelected? : boolean;
  thumbsUpSelected? : boolean;
  
  copySelected? : boolean;

  documents? : Document[];

  audio? : string;

  widgetActions: WidgetAction[];
}

interface Response {
  status: string;
  response: string;
  errorMessage: string;
}

interface ImageResponse {
  status: string;
  errorMessage: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

interface AudioResponse {
  status: string;
  errorMessage: string;
  audio: string;
}

interface WidgetConfig {
  widgets: WidgetStep[];
}

interface WidgetStep {
  name: string;
  type: string;
  message?: string;
  step: number;
  repeat: boolean;
  widgetActions: WidgetAction[];
}

interface WidgetAction {
  type: string;
  name: string;
  label: string;
  action: Action;
  disabled: boolean;
}

export interface Action {
  type: string;
  label: string;
  inputType?: string;
  inputValue?: string;
  variable?: string;
  prompt?: string;
}
