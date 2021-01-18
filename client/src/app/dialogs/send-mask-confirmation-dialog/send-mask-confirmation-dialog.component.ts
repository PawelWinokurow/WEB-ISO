import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { HttpService } from 'src/app/services/http.service';

/**
 * The dialog to choose the direct or indirect type of customer mask sending.
 */
@Component({
  selector: 'app-send-mask-confirmation-dialog',
  templateUrl: './send-mask-confirmation-dialog.component.html',
  styleUrls: ['./send-mask-confirmation-dialog.component.scss']
})
export class SendMaskConfirmationDialogComponent {

  captcha: FormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<SendMaskConfirmationDialogComponent>, public dictionaryService: DictionaryService, private httpService: HttpService) { }

  /**
   * Resolving captcha triggers this method. The methods sends captcha to the server.
   * @param event Recaptcha string token
   */

  resolved(event) {
    this.httpService.sendToken(event).subscribe();
  }


  /**
   * Click on the "yes" button triggers this method. The method closes the dialog and returns "true" value. 
   */
  onYesClick() {
    this.dialogRef.close(true);
  }

  /**
   * Click on the "no" button triggers this method. The method closes the dialog and returns "false" value. 
   */
  onNoClick() {
    this.dialogRef.close(false);
  }

}
