import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpUserEvent, HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpErrorResponse } from '../../node_modules/@angular/common/http';
import { Router } from '../../node_modules/@angular/router';
import { Observable } from '../../node_modules/rxjs';
import 'rxjs/add/operator/do';
import { TokenStorage } from './token.storage';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable <HttpUserEvent<any>> {
  let authReq = req;
  if (this.token.getToken() != null) {
    authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
  }
  return next.handle(authReq).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
         
          if (err.status === 401) {
            this.router.navigate(['home']);
          }
        }
      }
    );
}

}
