import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionCardConfig, AuthService, ConfigService } from 'src/app/services';
import { GlobalErrorHandlerService } from 'src/app/services/global-error-handler.service';

enum CardType {
  GeminiForMarketing = "GEMINI",
  FirstPartyTool = "1P",
  ThirdPartyTool = "3P"
}

@Component({
  selector: 'app-custom-card-edit-dialog',
  templateUrl: './custom-card-edit-dialog.component.html',
  styleUrls: ['./custom-card-edit-dialog.component.scss']
})
export class CustomCardEditDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ActionCardConfig, public authService: AuthService, public configService: ConfigService, private httpClient: HttpClient, 
    private dialogRef: MatDialogRef<CustomCardEditDialogComponent>,  private errorService: GlobalErrorHandlerService) {}

  public matcher = new CustomCardEditErrorStateMatcher();

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    name: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    description: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    systemPrompt: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    shareCard: new FormControl<boolean>(false)
  });

   /**
   * On component init.
   */
   ngOnInit(): void {
    if (this.data) {
      this.editForm.controls.name.setValue(this.data.name);
      this.editForm.controls.description.setValue(this.data.description);
      this.editForm.controls.systemPrompt.setValue(this.data.systemPrompt);
      this.editForm.controls.shareCard.setValue(this.data.shareCard);
    }
  }

  public delete() {
    if (this.authService.user && this.authService.user.uid && this.configService.userConfig.actionCardConfig) {
      this.configService.userConfig.actionCardConfig.forEach((card, cardIndex) => {
        if(card === this.data) {
          this.configService.userConfig.actionCardConfig!.splice(cardIndex, 1);
        };
      });
      this.configService.saveUserConfig(this.authService.user.uid);
    } else {
      this.errorService.handleError('editCustomPrompt(): User object is missing');
    }
  }

  public submit() {
    
    this.isSubmitted = true;

    // if valid, post the form to the backend
    if (this.editForm.valid) {

      if (!this.data) this.data = <ActionCardConfig>{};

      this.data.name = this.editForm.controls.name.value + '';
      this.data.description = this.editForm.controls.description.value + '';
      this.data.systemPrompt = this.editForm.controls.systemPrompt.value + '';
      this.data.complianceMessage = '';
      this.data.externalLinkUrl = '';
      this.data.is1PExternal = false;
      this.data.is3PExternal = false;
      this.data.isComingSoon = false;
      this.data.showUploadHint = false;
      this.data.shareCard = this.editForm.controls.shareCard.value!;
      
      this.dialogRef.close(this.data);
    }
  }


}

// error when invalid control is dirty, touched, or submitted.
export class CustomCardEditErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
