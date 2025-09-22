import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComplianceClaimsConfig, ConfigService } from 'src/app/services';

@Component({
  selector: 'app-claim-edit-dialog',
  templateUrl: './claim-edit-dialog.component.html',
  styleUrls: ['./claim-edit-dialog.component.scss']
})
export class ClaimEditDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ComplianceClaimsConfig, private configService: ConfigService, private dialogRef: MatDialogRef<ClaimEditDialogComponent>) {}

  public matcher = new ClaimErrorStateMatcher();

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    problematicTerms: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    complianceMessage: new FormControl<string>('', [Validators.minLength(2), Validators.required])
  });

  /**
   * On component init.
   */
  ngOnInit(): void {
    if (this.data) {
      this.editForm.controls.problematicTerms.setValue(this.data.problematicTerms);
      this.editForm.controls.complianceMessage.setValue(this.data.complianceMessage);
    }
  }

  public delete() {
    this.configService.config.complianceConfig.complianceClaimsConfig.forEach((item, index) => {
      if(item === this.data) this.configService.config.complianceConfig.complianceClaimsConfig.splice(index,1);
    });
    this.configService.hasChanged = true;
  }

  public submit() {
    this.isSubmitted = true;

    // if valid, post the form to the backend
    if (this.editForm.valid) {

      if (!this.data)
        this.data = <ComplianceClaimsConfig>{};

      this.data.problematicTerms = this.editForm.controls.problematicTerms.value + '';
      this.data.complianceMessage = this.editForm.controls.complianceMessage.value + '';

      this.dialogRef.close(this.data);
    }
  }

}

// error when invalid control is dirty, touched, or submitted.
export class ClaimErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
