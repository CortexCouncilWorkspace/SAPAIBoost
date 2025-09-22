import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, take } from 'rxjs';
import { Firestore, provideFirestore, FirestoreModule, collection, collectionData, doc, docData, getDoc, setDoc, DocumentData } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

const USER_CONFIG_PATH: string = "user-configuration/";

export enum CardCategoryType {
  Text = 0,
  Image = 1,
  Audio = 2
}

/**
 * Base configuration object common to all users
 */
export interface Config {
  welcomeMessage: string;
  systemPrompt: string;
  brandConfig: BrandConfig[];
  actionCardCategoryConfig: ActionCardCategoryConfig[];
  complianceConfig: ComplianceConfig;
  languageConfig: LanguageConfig[];
  voiceConfig: VoiceLocaleConfig[];
}

/**
 * User-specific configuration object.
 */
export interface UserConfig {
  actionCardConfig?: ActionCardConfig[];
  brandConfigName?: string;
  languageConfigCode?: string;
  voiceLocaleConfigName?: string;
  voiceConfigName?: string;
}

/**
 * Supported languages
 */
export interface LanguageConfig {
  name: string;
  code: string;
}

/**
 * Brand configuration (style & tone prompts)
 */
export interface BrandConfig {
   name: string;
   logoUrl: string;
   systemPrompt: string;
   isDisabled: boolean;
   subBrandConfig?: BrandConfig[];
}

/**
 * Action card categories (e.g. Copy Generation, Image Generation), consisting of action cards
 */
export interface ActionCardCategoryConfig {
  name: string;
  iconSymbolName: string;
  type: CardCategoryType;
  disableComplianceMessages: boolean;
  actionCardConfig: ActionCardConfig[];
}

/**
 * Action card configuration.
 */
export interface ActionCardConfig {
  name: string;
  description: string;
  systemPrompt: string;
  userMessage: string;
  widgetConfig: string;
  complianceMessage: string;
  externalLinkUrl: string;
  is1PExternal: boolean;
  is3PExternal: boolean;
  isComingSoon: boolean;
  showUploadHint: boolean;
  templateFileId: string;
  templateFileName: string;
  category?: ActionCardCategoryConfig;
  shareCard: boolean;
  isBeta: boolean;
}

/**
 * Compliance configuration
 */
export interface ComplianceConfig {
  imageDownloadComplianceMessage: string;
  audioDownloadComplianceMessage: string;
  complianceClaimsConfig: ComplianceClaimsConfig[];
}

/**
 * Claims compliance configuration.
 */
export interface ComplianceClaimsConfig {
  problematicTerms: string;
  complianceMessage: string;
}

/**
 * Voice configuration
 */
export interface VoiceConfig {
  name: string;
  locale: string;
  gender: string;
  hertz: number;
  type: string;
}

export interface VoiceLocaleConfig {
  name: string;
  locale: string;
  voiceConfig: VoiceConfig[];
}

@Injectable({
  providedIn: 'root'
})
/**
 * Loads and provides configuration settings to the application.
 */
export class ConfigService {

  private _config: Config;
  private _userConfig: UserConfig = {};
  private _hasChanged: boolean;

  constructor(private httpClient: HttpClient, private firestore: Firestore) {}

  // retrieve base configuration object
  get config() {
    return this._config;
  }

  // retrieve user-specific configuration object
  get userConfig() {
    return this._userConfig;
  }

  // flag that the configuration has changed but hasn't been persisted
  get hasChanged() {
    return this._hasChanged;
  }
  set hasChanged(value: boolean) {
    this._hasChanged = value;
  }

  // load base configuration
  public async loadConfig(): Promise<any> {
    return await getDoc(doc(this.firestore, environment.appConfigFirestorePath)).then((doc) => {
      if (doc.exists()) {
        this._config = <Config>doc.data();
      }
    });
  }

  // save configuration
  public async saveConfig(): Promise<any> {
    return setDoc(doc(this.firestore, environment.appConfigFirestorePath), this.config).then(() => {
      this._hasChanged = false;
    });
  }

  // load user configuration
  public async loadUserConfig(userId: string): Promise<any> {
    return await getDoc(doc(this.firestore, USER_CONFIG_PATH + userId)).then((doc) => {
      if (doc.exists()) {
        this._userConfig = <UserConfig>doc.data();
      }
    });
  }

  // save user configuration
  public async saveUserConfig(userId: string): Promise<any> {
    return setDoc(doc(this.firestore, USER_CONFIG_PATH + userId), this.userConfig);
  }

  public resetUserConfig() {
    this._userConfig = { "actionCardConfig": [] };
  }
  
}
