import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private baseUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  getUser(userLogin: String, userPassword: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userLogin}/${userPassword}`, { responseType: 'text' });
  }

}
