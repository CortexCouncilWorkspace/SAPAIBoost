import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService, BrandConfig } from 'src/app/services';
import { StyleEditDialogComponent } from '../style-config/style-edit-dialog/style-edit-dialog.component';

const DEFAULT_APPLICATION_NAME = "Marketing";
const DEFAULT_APPLICATION_CONFIG_PATH = "/configuration/production";

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent {
  
  constructor(public configService: ConfigService, public dialog: MatDialog) { }

  public matcher = new GeneralConfigErrorStateMatcher();

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    applicationName: new FormControl<string>({value: DEFAULT_APPLICATION_NAME, disabled: true}),
    configurationPath: new FormControl<string>({value: DEFAULT_APPLICATION_CONFIG_PATH, disabled: true}),
    welcomeMessage: new FormControl<string>('', [Validators.minLength(2), Validators.required])
  });

  /**
   * On component init
   */
  ngOnInit(): void {
    this.editForm.controls.welcomeMessage.setValue(this.configService.config.welcomeMessage);
    this.editForm.controls.welcomeMessage.valueChanges.subscribe(value => {
      this.configService.config.welcomeMessage = this.editForm.controls.welcomeMessage.value + '';
      this.configService.hasChanged = true;
    });
  }

  public submit() {
    // if valid, post the form to the backend
    if (this.editForm.valid) {
      this.configService.config.welcomeMessage = this.editForm.controls.welcomeMessage.value + '';
    }
  }

}

// error when invalid control is dirty, touched, or submitted.
export class GeneralConfigErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
