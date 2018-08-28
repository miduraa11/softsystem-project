import { Injectable, EventEmitter } from '@angular/core';
import * as JWT from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';
const USER_ID = 'User id';

export interface TokenData {
  sub: string;
  scopes: string;
  iat: number;
  exp: number;
  userId: any;
}

@Injectable()
export class TokenStorage {

  userToken: TokenData;
  userEmitter: EventEmitter<TokenData> = new EventEmitter<TokenData>();

  constructor() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      this.userToken = JWT(token);
    }
   }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_ID);
    delete this.userToken;
    this.userEmitter.emit(null);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    this.userToken = JWT(token);
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, this.userToken.userId)
    this.userEmitter.emit(this.userToken);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getDecodedToken(): TokenData {
    return this.userToken;
  }
}