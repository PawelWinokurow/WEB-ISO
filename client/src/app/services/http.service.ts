import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DictionaryService } from './dictionary.service';


/**
 * Sends customer masks to the web server.
 */
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