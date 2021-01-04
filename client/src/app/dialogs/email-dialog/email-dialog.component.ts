import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';

/**
 * Dialog to enter email address for confirmation email
 */
@Component({
  selector: 'email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent {

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<EmailDialogComponent>, public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService) { }
  
  /**
   * If yes is clicked
   */
  onYesClick() {
    this.dialogRef.close(this.email.value);
  }

    /**
   * If no is clicked
   */
  onNoClick() {
    this.dialogRef.close(false);
  }

}
