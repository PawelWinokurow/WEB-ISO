import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { mergeMap } from 'rxjs/operators';
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

  private setSession(result) {
    if (result) {
      console.log(result)
      const expiresAt = moment().add(result.expiresIn, 'second');
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      this.storageService.isLoggedIn = true;
      this.storageService.user = result.user;
      return true;
    }
    return false;
  }

  logout() {
    this.storageService.isLoggedIn = false;
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

  createUser(user) {
    return this.http.post(`${environment.serverURL}/createuser`, user);
  }
}
