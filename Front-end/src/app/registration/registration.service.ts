import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../model/user';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/registration';
  
  constructor(private http: HttpClient) { }
  
  getLoginExist(login: boolean): Observable<any> {
    return this.http.get(`//localhost:8080/registration/loginExist/${login}`);
  }

  // postLoginExist(login: string): Observable<any> {
  //   return this.http.post(`//localhost:8080/registration/loginExist/${login}`,{responseType: 'text'});
  // }

  addUser(user: User){
    return this.http.post(`${this.baseUrl}/add/${user.login}/${user.firstName}/${user.lastName}/${user.email}/${user.password}`,{responseType: 'text'});
  }

}
