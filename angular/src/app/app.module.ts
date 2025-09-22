import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { ErrorStateMatcher } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { ChatComponent, SafeHtmlPipe, SafeUrlPipe, VoiceNameTransform, VoiceQualityTransform } from './chat/chat.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ConfigService } from './services/config.service';
import { CardConfigComponent } from './admin/card-config/card-config.component';
import { CardCategoryEditDialogComponent } from './admin/card-config/card-category-edit-dialog/card-category-edit-dialog.component';
import { CardEditDialogComponent } from './admin/card-config/card-edit-dialog/card-edit-dialog.component'

import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { StyleConfigComponent } from './admin/style-config/style-config.component';
import { ComplianceConfigComponent } from './admin/compliance-config/compliance-config.component';
import { StyleEditDialogComponent } from './admin/style-config/style-edit-dialog/style-edit-dialog.component';
import { ClaimEditDialogComponent } from './admin/compliance-config/claim-edit-dialog/claim-edit-dialog.component';
import { FeedbackListComponent } from './admin/feedback-list/feedback-list.component';
import { GeneralConfigComponent } from './admin/general-config/general-config.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { CustomCardEditDialogComponent } from './chat/custom-card-edit-dialog/custom-card-edit-dialog.component';
import { CardsComponent } from './chat/cards/cards.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { WidgetDialogComponent } from './chat/widget-dialog/widget-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    FeedbackComponent,
    AboutComponent,
    AdminComponent,
    CardConfigComponent,
    CardCategoryEditDialogComponent,
    CardEditDialogComponent,
    StyleConfigComponent,
    ComplianceConfigComponent,
    StyleEditDialogComponent,
    ClaimEditDialogComponent,
    FeedbackListComponent,
    GeneralConfigComponent,
    CustomCardEditDialogComponent,
    VoiceNameTransform,
    VoiceQualityTransform,
    SafeUrlPipe,
    SafeHtmlPipe,
    CardsComponent,
    ChatWindowComponent,
    WidgetDialogComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
    provideStorage(() => getStorage()),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TextFieldModule,
    MatChipsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: '', component: ChatComponent},
      {path: 'feedback', component: FeedbackComponent},
      {path: 'about', component: AboutComponent},
      {path: 'admin', component: AdminComponent}
    ])
  ],
  exports: [
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    GlobalErrorHandlerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [ConfigService],
      multi: true,
    },
    { 
      provide: ErrorHandler, 
      useExisting: GlobalErrorHandlerService
    },
    RouterModule,
    ErrorStateMatcher,
    VoiceNameTransform,
    VoiceQualityTransform,
    SafeUrlPipe,
    SafeHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function appInitializerFactory(configService: ConfigService) {
  // load configuration on app initialization
  return () => configService.loadConfig();
}
