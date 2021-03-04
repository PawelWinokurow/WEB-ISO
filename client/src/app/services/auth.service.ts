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

  login(email: string, password: string) {
    return this.http.post(`${environment.serverURL}/login`, { email, password })
      .pipe(mergeMap(res => this.setSession(res)));
  }

  private setSession(authResult) {
    var promise = new Promise((resolve, reject) => {
      if (authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        this.storageService.isLoggedIn = true;
        resolve(true)
      }
      reject(false)
    });
    return promise;
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
}
