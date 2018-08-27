import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private baseUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  getUser(userLogin: String, userPassword: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userLogin}/${userPassword}`, { responseType: 'text' });
  }

  getUserRole(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`, { responseType: 'text' });
  }
  
}
