import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DictionaryService } from './dictionary.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private router: Router, private dictionaryService: DictionaryService, private toastrService: ToastrService) {}

  request(func): Observable<any>{
    return func.pipe(map(this.handleResponseMessages), catchError(this.handleError()));
  }

  handleResponseMessages(response){
    if ('message' in response){
      const messageAbbreviation = response.message;
      this.toastrService.success(this.dictionaryService.get(messageAbbreviation), this.dictionaryService.get('SUC'));
      delete response.message;
    }
    if ('error' in response){
      const errorAbbreviation = response.error;
      this.toastrService.error(this.dictionaryService.get(errorAbbreviation), this.dictionaryService.get('ERR'))
      delete response.error;
    }
    return response
  }

  /**
   * Error handler.
   * @template T 
   * @param [operation] 
   * @param [result] 
   * @returns Error response observable.
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      if (error.status == 401) {
        alert(this.dictionaryService.get('NOTALLOWED'));
        //this.router.navigate(['/login']);
      }
      return of(result as T);
    };
  }
}