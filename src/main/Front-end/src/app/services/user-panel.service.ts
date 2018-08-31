import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  private baseUrl = '/api/user-panel';

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

  authentication(authenticationKey: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accountActivation`, authenticationKey, {responseType: 'text'});
  }

  saveActivationPassword(newPassword: String) : Observable<any> {
    return this.http.post(`${this.baseUrl}/change-activation-password`, newPassword);
  }
}
