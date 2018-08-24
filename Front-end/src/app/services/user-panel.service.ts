import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private baseUrl = 'http://localhost:8080/user-panel';
  constructor(private http: HttpClient) { }

  getUserById(currentUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${currentUser}`);
  }

  getAccount(currentUser: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/account/${currentUser}`);
  }

  changePassword(id: number,currentPassword: String, password: String){
    return this.http.get(`${this.baseUrl}/change//${id}/${currentPassword}/${password}`);
  }

  getHistory(id: number){
    return this.http.get(`${this.baseUrl}/history/${id}`);
  }
}
