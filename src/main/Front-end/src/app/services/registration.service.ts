import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = '/api/registration';
  
  constructor(private http: HttpClient) { }
  
  getLoginExist(login: string): Observable<any> {
    return this.http.get(`/api/registration/loginExist/${login}`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`/api/registration/add`, user, {responseType: 'text'});
  }

}
