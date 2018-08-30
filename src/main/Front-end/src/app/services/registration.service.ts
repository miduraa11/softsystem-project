import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/registration';
  
  constructor(private http: HttpClient) { }
  
  getLoginExist(login: string): Observable<any> {
    return this.http.get(`//localhost:8080/registration/loginExist/${login}`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`//localhost:8080/registration/add`, user, {responseType: 'text'});
  }

}
