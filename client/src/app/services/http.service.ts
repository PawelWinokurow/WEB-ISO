import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


/**
 * Sends customer masks to the web server.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json');
  tempNodeJS = "http://127.0.0.1:3000/request";

  constructor(private http: HttpClient) {}

  /**
   * Sends customer mask to the server as JSON.
   * @param mask Object { isDirect: boolean, sapMask: SharedMask }
   * @returns Response observable.
   */
  sendMask(mask): Observable<any>{
    return this.http.post(this.tempNodeJS, JSON.stringify(mask), {
      headers: this.headers
    }).pipe(catchError(this.handleError('send mask')));
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
