import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private dictionaryService: DictionaryService) { }

  errorsDE = new Map([
    ['required', ' ist erforderlich'],
    ['VAL', ' ist ungültig.'],
    ['email', ' ist ungültig.'],
  ])

  errorsEN = new Map([
    ['required', ' is required'],
    ['VAL', ' is not valid'],
    ['email', ' is not valid'],
  ])

  errors = new Map([
    ['DE', this.errorsDE],
    ['EN', this.errorsEN]
  ])

  getError(fieldName, errorType){
    console.log(errorType)
    
    let name = this.dictionaryService.get(fieldName);
    let text = this.errors.get(this.dictionaryService.currentLanguage).get(errorType);
    return name + text;
  }
}
