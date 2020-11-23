import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private dictionaryService: DictionaryService) { }

  errorsDE = new Map([
    ['REQ', ' ist erforderlich'],
  ])

  errorsEN = new Map([
    ['REQ', ' is required'],
  ])

  errors = new Map([
    ['DE', this.errorsDE],
    ['EN', this.errorsEN]
  ])

  getError(fieldName, errorType){
    let name = this.dictionaryService.get(fieldName);
    let text = this.errors.get(this.dictionaryService.currentLanguage).get(errorType);
    return name + text;
  }
}
