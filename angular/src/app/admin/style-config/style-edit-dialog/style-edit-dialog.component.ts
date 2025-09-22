import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrandConfig, ConfigService } from 'src/app/services';

@Component({
  selector: 'app-style-edit-dialog',
  templateUrl: './style-edit-dialog.component.html',
  styleUrls: ['./style-edit-dialog.component.scss']
})
export class StyleEditDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BrandConfig, private configService: ConfigService, public dialog: MatDialog, private dialogRef: MatDialogRef<StyleEditDialogComponent>) {}

  public matcher = new StyleEditErrorStateMatcher();

  public isSubmitted: boolean = false;

  public isSubBrand: boolean = false;

  private urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  // create a form group for editing
  public editForm = new FormGroup({
    name: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    systemPrompt: new FormControl<string>(''),
    logoUrl: new FormControl<string>('', [Validators.required, Validators.pattern(this.urlRegex)]),
  });

  /**
   * On component init.
   */
  ngOnInit(): void {
    if (this.data) {
      this.editForm.controls.name.setValue(this.data.name);
      this.editForm.controls.systemPrompt.setValue(this.data.systemPrompt);
      this.editForm.controls.logoUrl.setValue(this.data.logoUrl);
    }
    this.isSubBrand = (this.dialog.openDialogs.length > 1);
  }
  
  public delete() {
    this.configService.config.brandConfig.forEach((item, index) => {
      if(item === this.data) this.configService.config.brandConfig.splice(index,1);
    });
    this.configService.hasChanged = true;
  }

  public submit() {
    this.isSubmitted = true;

    // if valid, post the form to the backend
    if (this.editForm.valid) {

      if (!this.data)
        this.data = <BrandConfig>{};

      this.data.name = this.editForm.controls.name.value + '';
      this.data.systemPrompt = this.editForm.controls.systemPrompt.value + '';
      this.data.logoUrl = this.editForm.controls.logoUrl.value + '';

      this.dialogRef.close(this.data);
    }
  }

  public editSubBrandConfig(subBrandConfig?: BrandConfig) {
    let isNew: boolean = false;
    if (!subBrandConfig)
      isNew = true;
    if (!this.data)
      this.data = { name: '', logoUrl: '', systemPrompt: '', isDisabled: false };
    this.dialog.open(StyleEditDialogComponent, { data: subBrandConfig, id: "subBrandDialog" }).afterClosed().subscribe(result => {

      // if the card edit was saved
      if (result) {
        if (isNew) {
          // add new brand config
          if (!this.data.subBrandConfig)
            this.data.subBrandConfig = [];
          this.data.subBrandConfig.push(result);
        }
        this.configService.hasChanged = true;
      }
    });
  }

}

// error when invalid control is dirty, touched, or submitted.
export class StyleEditErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
