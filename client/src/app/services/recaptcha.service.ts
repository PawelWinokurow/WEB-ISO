import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor(private httpService: HttpService, private http: HttpClient) { }

    /**
   * Sends captcha token to the server.
   * @param token 
   */
     sendToken(token): Observable<any>{
      return this.httpService.request(this.http.post(`${environment.serverURL}/customers/recaptcha`, {recaptcha: token}))
    }
}
