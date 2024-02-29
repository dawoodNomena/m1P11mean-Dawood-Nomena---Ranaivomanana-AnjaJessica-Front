import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router){}

    canActivate(): boolean{
    
    if(localStorage.getItem('user')!=null && localStorage.getItem('auth-token')){
        if(JSON.parse(localStorage.getItem('auth-token'))){
            return true;
        }
    }
    else {
        this.router.navigate(['/auth/signin']);
    }
    return false;
  }
  
}
