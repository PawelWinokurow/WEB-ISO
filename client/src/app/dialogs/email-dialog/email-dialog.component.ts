import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {

  email: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);

  constructor(public dialogRef: MatDialogRef<EmailDialogComponent>, public dictionaryService: DictionaryService) { }

  ngOnInit(): void {
  }

  onYesClick() {
    this.dialogRef.close(this.email.value);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

}
