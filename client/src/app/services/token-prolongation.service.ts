import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenProlongationService implements OnInit {

  constructor(private authService: AuthService, private stortageService: StorageService) {}

  timer = null;

  ngOnInit(): void {}

  startChecking(){
    //Call refreshToken every 10 minutes
    this.timer = setInterval(this.refreshToken.bind(this), 10 * 60 * 1000);
  }

  stopChecking(){
    clearInterval(this.timer);
  }

  refreshToken(){
    const exp = this.authService.getExpiration();
    const now = moment();
    //If JWT expires in < 30 minutes => update it
    if (exp.diff(now, 'minutes') > 0 && exp.diff(now, 'minutes') < 30){
      this.authService.prolongToken(this.authService.getUser()).toPromise().then(res => {
        this.authService.setSession(res);
      }).catch(err => this.stopChecking());
    }
  }
}
