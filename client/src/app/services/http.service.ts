import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mask } from '../interfaces/mask';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json');
  tempNodeJS = "http://127.0.0.1:3000/request";

  constructor(private http: HttpClient) {}

  sendMask(mask: Mask){
    return this.http.post(this.tempNodeJS, JSON.stringify(mask), {
      headers: this.headers
    })
  }


}
