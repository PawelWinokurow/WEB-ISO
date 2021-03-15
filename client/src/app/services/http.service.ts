import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DictionaryService } from './dictionary.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private router: Router, private dictionaryService: DictionaryService) {}

  request(func): Observable<any>{
    return func.pipe(catchError(this.handleError()));
  }

  /**
   * Error handler.
   * @template T 
   * @param [operation] 
   * @param [result] 
   * @returns Error response observable.
   */
  private handleError<T>(operation = 'operation', result?: T) {
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