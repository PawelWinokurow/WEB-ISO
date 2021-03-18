import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  createAccount(account) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/accounts`, { account }));
  }

  updateAccount(account) {
    return this.httpService.request(this.http.put(`${environment.serverURL}/accounts`, { account }));
  }

  deleteAccount(account) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { account }
    };
    return this.httpService.request(this.http.delete(`${environment.serverURL}/accounts`, httpOptions));
  }

  blockAccount(account) {
    return this.httpService.request(this.http.patch(`${environment.serverURL}/accounts`, { account }));
  }

  resetPassword(account) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/accounts/reset`, { account }));
  }

  validatePasswordResetHash(account) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/accounts/reset/validation`, { account }));
  }

  requestPasswordReset(account) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/accounts/reset/request`, { account }));
  }

  getAccounts(): Observable<any> {
    return this.httpService.request(this.http.get(`${environment.serverURL}/accounts`));
  }
}
