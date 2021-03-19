import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from './../../environments/environment';
import { HttpService } from './http.service';
import { AccountJWT } from 'src/app/interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timer = null;

  constructor(private http: HttpClient, private httpService: HttpService) { }

  async login(identifier: string, password: string) {
    let result = await this.httpService.request<AccountJWT>(this.http.post(`${environment.serverURL}/login`,
      { account: { email: identifier, username: identifier, password: password } })).toPromise();
    if (result) {
      this.setSession(result)
    }
    return result;
  }

  public setSession(result: AccountJWT) {
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

  get account() {
    return JSON.parse(localStorage.getItem("account"))
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  //Call refreshToken every 10 minutes
  startChecking(defaultInterval = 10) {
    this.timer = setInterval(this.checkTokenExpiration.bind(this), defaultInterval * 60 * 1000);
  }

  stopChecking() {
    clearInterval(this.timer);
  }

  async refreshToken() {
    console.log(this.account)
    //console.log(this.account())
    return await this.httpService.request<AccountJWT>(this.http.put(`${environment.serverURL}/login`, this.account)).toPromise();
  }

  async checkTokenExpiration() {
    const exp = this.getExpiration();
    const now = moment();
    //If JWT expires in < 30 minutes => update it
    if (exp.diff(now, 'minutes') > 0 && exp.diff(now, 'minutes') < 30) {
      try {
        let jwtAccount = await this.refreshToken();
        this.setSession(jwtAccount);
        return true;
      } catch (e) {
        this.stopChecking();
        console.error(e.stack);
        return false;
      }
    }
  }
}
