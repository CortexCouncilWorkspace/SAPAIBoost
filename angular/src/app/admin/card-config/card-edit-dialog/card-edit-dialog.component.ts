import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { lastValueFrom, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn, AbstractControl, ValidationErrors, } from '@angular/forms';
import { ConfigService, ActionCardCategoryConfig, ActionCardConfig } from '../../../services';

enum CardType {
  GeminiForMarketing = "GEMINI",
  FirstPartyTool = "1P",
  ThirdPartyTool = "3P"
}

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.scss']
})
export class CardEditDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ActionCardConfig, public configService: ConfigService, private httpClient: HttpClient, private dialogRef: MatDialogRef<CardEditDialogComponent>) {}

  public matcher = new CardEditErrorStateMatcher();

  public isSubmitted: boolean = false;

  private urlRegex = /^(?:http(s)?:\/\/.*)$/;

  private cloudStorageUriRegex = /^gs:\/\/.*$/;

  // create a form group for editing
  public editForm = new FormGroup({
    category: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    description: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    systemPrompt: new FormControl<string>(''),
    complianceMessage: new FormControl<string>(''),
    type: new FormControl<string>(''),
    externalLinkUrl: new FormControl<string>('', [Validators.pattern(this.urlRegex)]),
    isComingSoon: new FormControl<boolean>(false),
    showUploadHint: new FormControl<boolean>(false),
    templateFileId: new FormControl<string>(''), // TODO: validate URL is a valid drive file id
    templateFileName: new FormControl<string>(''),
    isBeta: new FormControl<boolean>(false),
    userMessage: new FormControl<string>(''),
    widgetConfig: new FormControl<string>('')
  });

  public get CardType() {
    return CardType; 
  }
  
   /**
   * On component init.
   */
   ngOnInit(): void {
    if (this.data) {

      let category = this.getCategoryForCard(this.data.name);
      if (category) this.editForm.controls.category.setValue(category.name);
      
      this.editForm.controls.name.setValue(this.data.name);
      this.editForm.controls.description.setValue(this.data.description);
      this.editForm.controls.systemPrompt.setValue(this.data.systemPrompt);
      this.editForm.controls.complianceMessage.setValue(this.data.complianceMessage);

      if (!this.data.is1PExternal && !this.data.is3PExternal)
        this.editForm.controls.type.setValue(CardType.GeminiForMarketing);
      else if (this.data.is1PExternal)
        this.editForm.controls.type.setValue(CardType.FirstPartyTool);
      else if (this.data.is3PExternal)
        this.editForm.controls.type.setValue(CardType.ThirdPartyTool);

      this.editForm.controls.externalLinkUrl.setValue(this.data.externalLinkUrl);

      this.editForm.controls.isComingSoon.setValue(this.data.isComingSoon);
      this.editForm.controls.showUploadHint.setValue(this.data.showUploadHint);
      this.editForm.controls.isBeta.setValue(this.data.isBeta);
      this.editForm.controls.templateFileId.setValue(this.data.templateFileId);
      this.editForm.controls.templateFileName.setValue(this.data.templateFileName);
      this.editForm.controls.userMessage.setValue(this.data.userMessage);
      this.editForm.controls.widgetConfig.setValue(this.data.widgetConfig);
    }
  }

  private getCategoryForCard(cardName: string): ActionCardCategoryConfig | undefined {
    let foundCategory: ActionCardCategoryConfig | undefined = undefined;
    this.configService.config.actionCardCategoryConfig.forEach((categoryConfig) => {
      categoryConfig.actionCardConfig.forEach((cardConfig) => {
        if (cardName === cardConfig.name)
          foundCategory = categoryConfig;
      });
    });
    return foundCategory;
  }

  private getCategoryByName(categoryName: string): ActionCardCategoryConfig | undefined {
    let foundCategory: ActionCardCategoryConfig | undefined = undefined;
    this.configService.config.actionCardCategoryConfig.forEach((categoryConfig) => {
      if (categoryName === categoryConfig.name)
        foundCategory = categoryConfig;
    });
    return foundCategory;
  }

  public delete() {
    this.configService.config.actionCardCategoryConfig.forEach((category, categoryIndex) => {
      category.actionCardConfig.forEach((card, cardIndex) => {
        if(card === this.data) {
          category.actionCardConfig.splice(cardIndex, 1);
        }
      });
    });
    this.configService.hasChanged = true;
  }

  public submit() {

    this.isSubmitted = true;

    // if valid, post the form to the backend
    if (this.editForm.valid) {

      if (!this.data) this.data = <ActionCardConfig>{};

      this.data.category = this.getCategoryByName(this.editForm.controls.category.value + '');

      this.data.name = this.editForm.controls.name.value + '';
      this.data.description = this.editForm.controls.description.value + '';
      
      if (this.editForm.controls.type.value === CardType.GeminiForMarketing) {
        this.data.is1PExternal = false;
        this.data.is3PExternal = false;
        this.data.systemPrompt = this.editForm.controls.systemPrompt.value + '';
        this.data.complianceMessage = this.editForm.controls.complianceMessage.value + '';
        this.data.templateFileId = this.editForm.controls.templateFileId.value + '';
        this.data.templateFileName = this.editForm.controls.templateFileName.value + '';
        this.data.userMessage = this.editForm.controls.userMessage.value + '';
        this.data.widgetConfig = this.editForm.controls.widgetConfig.value + '';
      }
      else if (this.editForm.controls.type.value === CardType.FirstPartyTool) {
        this.data.is1PExternal = true;
        this.data.externalLinkUrl = this.editForm.controls.externalLinkUrl.value + '';
      }
      else if (this.editForm.controls.type.value === CardType.ThirdPartyTool) {
        this.data.is3PExternal = true;
        this.data.externalLinkUrl = this.editForm.controls.externalLinkUrl.value + '';
      }

      if (this.editForm.controls.isComingSoon.value)
        this.data.isComingSoon = this.editForm.controls.isComingSoon.value;
      else
        this.data.isComingSoon = false;

      if (this.editForm.controls.showUploadHint.value)
        this.data.showUploadHint = this.editForm.controls.showUploadHint.value;
      else
        this.data.showUploadHint = false;

      if (this.editForm.controls.isBeta.value)
        this.data.isBeta = this.editForm.controls.isBeta.value;
      else
        this.data.isBeta = false;
      
      this.dialogRef.close(this.data);
    }
  }


}

// error when invalid control is dirty, touched, or submitted.
export class CardEditErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
