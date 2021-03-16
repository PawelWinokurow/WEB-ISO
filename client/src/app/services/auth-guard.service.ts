import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; 
import { DictionaryService } from './dictionary.service';
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router: Router, private authService: AuthService, private dictionaryService: DictionaryService) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
        return this.checkAccountLogin(route, state.url);
    }

    checkAccountLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.authService.isLoggedIn()) {
          const accountRole = this.authService.getAccount().role;
          if (route.data.roles && route.data.roles.indexOf(accountRole) === -1) {
            alert(this.dictionaryService.get('NOTALLOWED'));
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        }
        alert(this.dictionaryService.get('NOTALLOWED'));
        this.router.navigate(['/login']);
        return false;
      }
 
}