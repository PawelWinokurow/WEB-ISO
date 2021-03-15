import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { environment } from '../../../environments/environment';

/**
 * The dialog to choose the direct or indirect type of customer sending.
 */
@Component({
  selector: 'app-send-customer-confirmation',
  templateUrl: './send-customer-confirmation.dialog.html',
  styleUrls: ['./send-customer-confirmation.dialog.scss']
})
export class SendCustomerConfirmationDialog {

  recaptchaSitekey = environment.recaptchaSitekey;

  captcha: FormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<SendCustomerConfirmationDialog>, public dictionaryService: DictionaryService, 
    private recaptchaService: RecaptchaService) { }

  /**
   * Resolving captcha triggers this method. The methods sends captcha to the server.
   * @param event Recaptcha string token
   */

  async resolved(captcha) {
    if (captcha != null) {
      this.recaptchaService.sendToken(captcha).subscribe(res => {
      });
    }
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
