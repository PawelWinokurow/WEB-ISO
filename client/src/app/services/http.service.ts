import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mask } from '../interfaces/mask';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json');
  tempNodeJS = "http://127.0.0.1:3000/request";

  constructor(private http: HttpClient) {}

  sendMask(mask){
    return this.http.post(this.tempNodeJS, JSON.stringify(mask), {
      headers: this.headers
    }).pipe(catchError(this.handleError('send mask')));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
