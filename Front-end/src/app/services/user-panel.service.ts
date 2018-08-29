import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private baseUrl = 'http://localhost:8080/user-panel';

  constructor(private http: HttpClient) { }

  getUserById(currentUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${currentUser}`);
  }

  getAccount(currentUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${currentUser}`);
  }

  changePassword(changePassword: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, changePassword, {responseType: 'text'});
  }

  getHistory(id: number){
    return this.http.get(`${this.baseUrl}/history/${id}`);
  }
}
