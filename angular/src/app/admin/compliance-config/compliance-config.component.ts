import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplianceClaimsConfig, ConfigService } from 'src/app/services';
import { ClaimEditDialogComponent } from './claim-edit-dialog/claim-edit-dialog.component';

@Component({
  selector: 'app-compliance-config',
  templateUrl: './compliance-config.component.html',
  styleUrls: ['./compliance-config.component.scss']
})
export class ComplianceConfigComponent {

  constructor(public configService: ConfigService, public dialog: MatDialog) { }

  public matcher = new ComplianceErrorStateMatcher();

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    imageDownloadComplianceMessage: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    audioDownloadComplianceMessage: new FormControl<string>('', [Validators.minLength(2), Validators.required])
  });

  /**
   * On component init
   */
    ngOnInit(): void {
      this.editForm.controls.imageDownloadComplianceMessage.setValue(this.configService.config.complianceConfig.imageDownloadComplianceMessage);
      this.editForm.controls.imageDownloadComplianceMessage.valueChanges.subscribe(value => {
        this.configService.config.complianceConfig.imageDownloadComplianceMessage = this.editForm.controls.imageDownloadComplianceMessage.value + '';
        this.configService.hasChanged = true;
      });
      
      this.editForm.controls.audioDownloadComplianceMessage.setValue(this.configService.config.complianceConfig.audioDownloadComplianceMessage);
      this.editForm.controls.audioDownloadComplianceMessage.valueChanges.subscribe(value => {
        this.configService.config.complianceConfig.audioDownloadComplianceMessage = this.editForm.controls.audioDownloadComplianceMessage.value + '';
        this.configService.hasChanged = true;
      });
      
      // Audio generation is an experimental feature and should not be used in public-facing marketing content. We are actively exploring policy changes to allow for synthetic voices in public-facing marketing materials. If a policy change is approved, this warning will be removed and the <a href='http://go/aichecklist' target='_blank'>AI Checklist</a> guidance will be updated.
    }
  
    /*public submit() {
      // if valid, post the form to the backend
      if (this.editForm.valid) {
        this.configService.config.complianceConfig.imageDownloadComplianceMessage = this.editForm.controls.imageDownloadComplianceMessage.value + '';
        this.configService.config.complianceConfig.audioDownloadComplianceMessage = this.editForm.controls.audioDownloadComplianceMessage.value + '';
      }
    }*/

    public editClaimConfig(claim?: ComplianceClaimsConfig) {
      let isNew: boolean = false;
      if (!claim) isNew = true;
      this.dialog.open(ClaimEditDialogComponent, { data: claim }).afterClosed().subscribe(result => {

      // if the card edit was saved
      if (result) {
        if (isNew) {
          // add new brand config
          this.configService.config.complianceConfig.complianceClaimsConfig.push(result);
        }
        this.configService.hasChanged = true;
      }
    });

}
}

// error when invalid control is dirty, touched, or submitted.
export class ComplianceErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
