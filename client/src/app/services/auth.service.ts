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
    return this.http.post(`${environment.serverURL}/login`, {user: { email: identifier, username: identifier, password: password }})
      .toPromise().then(res => this.setSession(res));
  }

  public setSession(result) {
    if (result) {
      const expiresAt = moment().add(result.expiresIn, 'milliseconds');
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem("user", JSON.stringify(result.user));
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

  setUser(user) {
    user = {
      username: user.username,
      email: user.email,
      companyCode: user.companycode,
      role: user.role
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  prolongToken(user) {
    return this.http.put(`${environment.serverURL}/login`, user);
  }
}
