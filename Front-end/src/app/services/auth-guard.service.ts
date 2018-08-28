import { Injectable } from '@angular/core';
import { TokenStorage } from '../token.storage';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public tokenStorage: TokenStorage, public router: Router) { }

  canActivate(): boolean {
    if(!this.tokenStorage.getToken()){
      this.router.navigate(['login']);
      return false;
    } else
    return true;;

  }
}
