import { Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

/**
 * Service to construct error from abbreviations and error type
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private dictionaryService: DictionaryService) { }

  errorsDE = new Map([
    ['required', ' ist erforderlich'],
    ['email', ' ist ungültig.'],
  ])

  errorsEN = new Map([
    ['required', ' is required'],
    ['email', ' is not valid'],
  ])

  errors = new Map([
    ['DE', this.errorsDE],
    ['EN', this.errorsEN]
  ])

  /**
   * Construct error from abbreviations and error type 
   * @param fieldName abbreviation defined in DictionaryService
   * @param errorType error type
   */
  getError(fieldName: string, errorType: string){
    let name = this.dictionaryService.get(fieldName);
    let text = this.errors.get(this.dictionaryService.currentLanguage).get(errorType);
    return name + text;
  }
}
