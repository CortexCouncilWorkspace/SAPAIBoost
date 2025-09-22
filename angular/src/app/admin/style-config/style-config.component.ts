import { Component } from '@angular/core';
import { BrandConfig, ConfigService } from '../../services';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { StyleEditDialogComponent } from './style-edit-dialog/style-edit-dialog.component';

@Component({
  selector: 'app-style-config',
  templateUrl: './style-config.component.html',
  styleUrls: ['./style-config.component.scss']
})
export class StyleConfigComponent {

  constructor(public configService: ConfigService, public dialog: MatDialog) { }

  public matcher = new StyleEditErrorStateMatcher();

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    systemPrompt: new FormControl<string>('', [Validators.minLength(2), Validators.required])
  });

  /**
   * On component init
   */
  ngOnInit(): void {
    this.editForm.controls.systemPrompt.setValue(this.configService.config.systemPrompt);

    this.editForm.controls.systemPrompt.valueChanges.subscribe(value => {
      this.configService.config.systemPrompt = this.editForm.controls.systemPrompt.value + '';
      this.configService.hasChanged = true;
    });
  }

  public submit() {

    // if valid, post the form to the backend
    if (this.editForm.valid) {
      this.configService.config.systemPrompt = this.editForm.controls.systemPrompt.value + '';
    }
  }

  public editBrandConfig(brandConfig?: BrandConfig) {
    let isNew: boolean = false;
    if (!brandConfig) isNew = true;
    this.dialog.open(StyleEditDialogComponent, { data: brandConfig, width: "1200px" }).afterClosed().subscribe(result => {

      console.log("test!");

      // if the card edit was saved
      if (result) {
        if (isNew) {
          // add new brand config
          this.configService.config.brandConfig.push(result);
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
