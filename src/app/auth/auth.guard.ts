import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map,  } from 'rxjs/operators';
import { SessionstorageService } from '../services/sessionstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
    constructor(private authService: AuthService,
      private router: Router,private sessionSotragesevice:SessionstorageService) { } 
   
   
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //recup variable Sessionstorage
    if (this.sessionSotragesevice.get("authenticated")) {

      //alert( this.sessionSotragesevice.get('authenticated'))

      console.log(this.sessionSotragesevice.get('authenticated'))

      return true;


   }
   // not logged in so redirect to login page with the return url
  
    this.router.navigate(['/login'], { queryParams: { returnUrl : state.url } })
    return false
  }

  
}
