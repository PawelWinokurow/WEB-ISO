import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from './../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(identifier: string, password: string) {
    return this.http.post(`${environment.serverURL}/login`, { identifier, password })
      .toPromise().then(res => this.setSession(res));
  }

  public setSession(result) {
    console.log(result)
    if (result) {
      const expiresAt = moment().add(result.expiresIn, 'milliseconds');
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem("user", JSON.stringify(result.user));
      this.storageService.user = result.user;
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  prolongToken(user) {
    return this.http.put(`${environment.serverURL}/login`, user);
  }

  createUser(user) {
    return this.http.post(`${environment.serverURL}/user`, user);
  }

  updateUser(user) {
    return this.http.put(`${environment.serverURL}/user`, user);
  }

  deleteUser(user) {
    return this.http.delete(`${environment.serverURL}/user`, user);
  }
}
