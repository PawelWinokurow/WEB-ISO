import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from './storage.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router: Router, private storageService: StorageService) {}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
        console.log(this.storageService.isLoggedIn)
        if (!this.storageService.isLoggedIn) {
            alert('You are not allowed to view this page. You are redirected to login Page');
            this.router.navigate(["/login"]);
            return false;
        } 
        return true;
    }
 
}