import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(identifier: string, password: string) {
    return this.http.post(`${environment.serverURL}/login`, {account: { email: identifier, username: identifier, password: password }})
      .toPromise().then(res => this.setSession(res));
  }

  public setSession(result) {
    if (result) {
      const expiresAt = moment().add(result.expiresIn, 'milliseconds');
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem("account", JSON.stringify(result.account));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  setAccount(account) {
    account = {
      username: account.username,
      email: account.email,
      companyCode: account.companyCode,
      role: account.role
    }
    localStorage.setItem("account", JSON.stringify(account));
  }

  getAccount() {
    return JSON.parse(localStorage.getItem("account"))
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  prolongToken(account) {
    return this.http.put(`${environment.serverURL}/login`, account);
  }
}
