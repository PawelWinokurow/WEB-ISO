import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router: Router, private authService: AuthService) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
        return this.checkUserLogin(route, state.url);
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.authService.isLoggedIn()) {
          const userRole = this.authService.getUser().role;
          if (route.data.roles && route.data.roles.indexOf(userRole) === -1) {
            alert('You are not allowed to view this page. You are redirected to login Page');
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        }
        alert('You are not allowed to view this page. You are redirected to login Page');
        this.router.navigate(['/login']);
        return false;
      }
 
}