import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.dialog.html',
  styleUrls: ['./delete-account.dialog.scss']
})
export class DeleteAccountDialog implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAccountDialog>, @Inject(MAT_DIALOG_DATA) public data, 
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
