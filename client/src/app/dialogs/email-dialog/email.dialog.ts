import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';

/**
 * The dialog to enter the email address for the confirmation email.
 */
@Component({
  selector: 'email',
  templateUrl: './email.dialog.html',
  styleUrls: ['./email.dialog.scss']
})
export class EmailDialog {

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<EmailDialog>, public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService) { }
  
  /**
   * Click on the "send" button triggers this method. The method closes the dialog and returns "email" value as a string. 
   */
  onYesClick() {
    this.dialogRef.close(this.email.value);
  }

  /**
   * Click on the "cancel" button triggers this method. The method closes the dialog and returns "false" value. 
   */
  onNoClick() {
    this.dialogRef.close(false);
  }

}
