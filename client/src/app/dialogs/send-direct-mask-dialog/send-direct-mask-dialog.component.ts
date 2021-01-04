import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';

/**
 * Dialog to select direct or undirect sending of the mask
 */
@Component({
  selector: 'app-send-direct-mask-dialog',
  templateUrl: './send-direct-mask-dialog.component.html',
  styleUrls: ['./send-direct-mask-dialog.component.scss']
})
export class SendMaskConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<SendMaskConfirmationDialogComponent>, public dictionaryService: DictionaryService,) { }

  /**
   * If yes is clicked
   */
  onYesClick() {
    this.dialogRef.close(true);
  }

  /**
   * If no is clicked
   */
  onNoClick() {
    this.dialogRef.close(false);
  }

}
