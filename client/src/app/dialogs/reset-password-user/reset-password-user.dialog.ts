import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.dialog.html',
  styleUrls: ['./reset-password-user.dialog.scss']
})
export class ResetPasswordUserDialog implements OnInit {

  emailForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ResetPasswordUserDialog>, 
    @Inject(MAT_DIALOG_DATA) public data, public dictionaryService: DictionaryService, 
    private formBuilder: FormBuilder, public errorMessageService: ErrorMessageService
  ) { }
  
  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get emailFormControl() {
    return this.emailForm.controls;
  }

  /**
   * Click on the "yes" button triggers this method. The method closes the dialog and returns email. 
   */
   async onYesClick() {
      if (this.emailForm.valid) {
        this.dialogRef.close(this.emailForm.controls['email'].value);
      } else {
        this.emailForm.markAllAsTouched();
    }
  }

  /**
   * Click on the "no" button triggers this method. The method closes the dialog and returns "false" value. 
   */
  onNoClick() {
    this.dialogRef.close(false);
  }

}
