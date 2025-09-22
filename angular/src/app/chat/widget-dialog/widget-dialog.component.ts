import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Action } from 'src/app/chat/chat.component';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-widget-dialog',
  templateUrl: './widget-dialog.component.html',
  styleUrls: ['./widget-dialog.component.scss']
})
export class WidgetDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Action, private dialogRef: MatDialogRef<WidgetDialogComponent>) {}

  public isSubmitted: boolean = false;

  // create a form group for editing
  public editForm = new FormGroup({
    inputValue: new FormControl<string>('', [Validators.minLength(2), Validators.required])
  });

  /**
   * On component init.
   */
  ngOnInit(): void {
    if (this.data) {
      if (this.data.inputValue)
        this.editForm.controls.inputValue.setValue(this.data.inputValue);
    }
  }

  public submit() {
    
    this.isSubmitted = true;

    // if valid, post the form to the backend
    if (this.editForm.valid) {

      if (!this.data) this.data = <Action>{};

      this.data.inputValue = this.editForm.controls.inputValue.value + '';
      
      this.dialogRef.close(this.data);
    }
  }
}
