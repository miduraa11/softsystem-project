import { Injectable } from '@angular/core';
import { TokenStorage } from '../token.storage';
import { Router, CanActivate } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(public tokenStorage: TokenStorage, public router: Router) { }

  canActivate(): boolean {
    if(this.tokenStorage.getToken()){
      this.router.navigate(['home']);
      return false;
    } else
      return true;

  }
}
