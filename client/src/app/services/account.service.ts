import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  createAccount<T>(account) {
    return this.httpService.request<T>(this.http.post(`${environment.serverURL}/accounts`, { account }));
  }

  updateAccount<T>(account) {
    return this.httpService.request<T>(this.http.put(`${environment.serverURL}/accounts`, { account }));
  }

  deleteAccount<T>(account) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { account }
    };
    return this.httpService.request<T>(this.http.delete(`${environment.serverURL}/accounts`, httpOptions));
  }

  blockAccount<T>(account) {
    return this.httpService.request<T>(this.http.patch(`${environment.serverURL}/accounts`, { account }));
  }

  resetPassword<T>(account) {
    return this.httpService.request<T>(this.http.post(`${environment.serverURL}/accounts/reset`, { account }));
  }

  validatePasswordResetHash<T>(account) {
    return this.httpService.request<T>(this.http.post(`${environment.serverURL}/accounts/reset/validation`, { account }));
  }

  requestPasswordReset<T>(account) {
    return this.httpService.request<T>(this.http.post(`${environment.serverURL}/accounts/reset/request`, { account }));
  }

  getAccounts<T>(){
    return this.httpService.request<T>(this.http.get(`${environment.serverURL}/accounts`));
  }
}
