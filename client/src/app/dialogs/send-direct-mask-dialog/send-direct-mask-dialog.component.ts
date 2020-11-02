import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-send-direct-mask-dialog',
  templateUrl: './send-direct-mask-dialog.component.html',
  styleUrls: ['./send-direct-mask-dialog.component.scss']
})
export class SendMaskConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SendMaskConfirmationDialogComponent>, public dictionaryService: DictionaryService,) { }

  ngOnInit(): void {
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

}
