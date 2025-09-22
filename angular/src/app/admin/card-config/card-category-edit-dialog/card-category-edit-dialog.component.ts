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
import { ConfigService, ActionCardCategoryConfig, ActionCardConfig, CardCategoryType } from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';

const MATERIAL_ICONS_FILE_LOCATION: string = "/assets/material-symbols.json";

const DELETE_FAILED_MESSAGE = "The category you selected for deletion contains action cards. Move or delete the child action cards before deleting the category.";

@Component({
  selector: 'app-card-category-edit-dialog',
  templateUrl: './card-category-edit-dialog.component.html',
  styleUrls: ['./card-category-edit-dialog.component.scss']
})
export class CardCategoryEditDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ActionCardCategoryConfig, private httpClient: HttpClient, private dialogRef: MatDialogRef<CardCategoryEditDialogComponent>, private configService: ConfigService, private snackBar: MatSnackBar,) {}

  public matcher = new CardCategoryEditErrorStateMatcher();

  private materialIcons;

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    name: new FormControl<string>('', [Validators.minLength(2), Validators.required]),
    iconSymbolName: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>(CardCategoryType.Text + '')
  });

  /**
   * On component init.
   */
  ngOnInit(): void {
    this.loadMaterialIcons().then((materialIcons) => {
      if (this.data) {
        this.editForm.controls.name.setValue(this.data.name);
        this.editForm.controls.iconSymbolName.setValue(this.data.iconSymbolName.toLowerCase());
        this.editForm.controls.type.setValue(this.data.type + '');
      }

      this.editForm.controls.iconSymbolName.addValidators(materialIconValidator(materialIcons));
      
    })
  }

  public async loadMaterialIcons(): Promise<any> {
    const request$ = this.httpClient.get(MATERIAL_ICONS_FILE_LOCATION).pipe(take(1));
    return await lastValueFrom<any>(request$).then((materialIcons) => {
      this.materialIcons = materialIcons;
      return materialIcons;
    });
  }

  public delete() {
    this.configService.config.actionCardCategoryConfig.forEach((category, categoryIndex) => {
      if(category === this.data) {
        if (category.actionCardConfig.length > 0) {
          this.snackBar.open(DELETE_FAILED_MESSAGE, "Close");
        }
        else {
          this.configService.config.actionCardCategoryConfig.splice(categoryIndex, 1);
          this.configService.hasChanged = true;
        }
      }
    });
  }

  public submit() {
    this.isSubmitted = true;

    // if valid, post the form to the backend
    if (this.editForm.valid) {

      if (!this.data)
        this.data = <ActionCardCategoryConfig>{};

      this.data.name = this.editForm.controls.name.value + '';
      this.data.iconSymbolName = (this.editForm.controls.iconSymbolName.value + '').toLowerCase();
      this.data.type = +this.editForm.controls.type.value!;

      this.dialogRef.close(this.data);
    }
  }

}

export function materialIconValidator(materialIcons: any): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if (!value)
        return null;
      let isIcon = false;
      if (materialIcons && control.value in materialIcons)
        isIcon = true;
      return !isIcon ? {iconValid: true} : null;
  }
}

// error when invalid control is dirty, touched, or submitted.
export class CardCategoryEditErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
