import { Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

/**
 * Сonstructs errors from abbreviations and error types.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private dictionaryService: DictionaryService) { }

  errorsDE = new Map([
    ['required', ' ist erforderlich'],
    ['email', ' ist ungültig'],
    ['validateUsername', ' darf nur aus Buchstaben, Ziffern und Unterstrichen bestehen'],
    ['validateName', ' darf nur aus Buchstaben bestehen'],
  ])

  errorsEN = new Map([
    ['required', ' is required'],
    ['email', ' is not valid'],
    ['validateUsername', ' must contain only letters numbers and underscores'],
    ['validateName', ' must contain only letters'],
  ])

  errors = new Map([
    ['DE', this.errorsDE],
    ['EN', this.errorsEN]
  ])

  /**
   * Constructs error from abbreviation and error type.
   * @param fieldName Abbreviation defined in DictionaryService map
   * @param errorType Error type
   */
  getError(fieldName: string, errorType: string){
    if (errorType === 'mustMatch') return;
    let name = this.dictionaryService.get(fieldName);
    let text = this.errors.get(this.dictionaryService.currentLanguage).get(errorType);
    return name + text;
  }
}
