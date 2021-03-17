import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-reset-password-admin',
  templateUrl: './reset-password-admin.dialog.html',
  styleUrls: ['./reset-password-admin.dialog.scss']
})
export class ResetPasswordAdminDialog implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetPasswordAdminDialog>, @Inject(MAT_DIALOG_DATA) public data, 
  public dictionaryService: DictionaryService) { }
  ngOnInit(): void {
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
