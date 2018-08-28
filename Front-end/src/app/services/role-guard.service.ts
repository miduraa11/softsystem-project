import { Injectable } from '@angular/core';
import { TokenStorage } from '../token.storage';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public tokenStorage: TokenStorage, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data.expectedRole;

    const userToken = this.tokenStorage.getDecodedToken();

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['login']);
      return false;
    } else if(userToken.scopes !== expectedRole){
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
    
  }
}
