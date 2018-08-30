import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private baseUrl = '/api/login';

  constructor(private http: HttpClient) { }

  getUser(userLogin: String, userPassword: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userLogin}/${userPassword}`, { responseType: 'text' });
  }

  getUserRole(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`, { responseType: 'text' });
  }
  
}
