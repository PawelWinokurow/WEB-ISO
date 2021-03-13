import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';


/**
 * Sends customer masks to the web server.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  request(func): Observable<any>{
    return func.pipe(catchError(this.handleError('send token')));
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
      return of(result as T);
    };
  }
}