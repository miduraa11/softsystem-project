import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/registration';
  
  constructor(private http: HttpClient) { }

  addUser(user: User){
    return this.http.post(`${this.baseUrl}/add/${user.firstName}/${user.lastName}/${user.email}/${user.password}`,{responseType: 'text'});
  }

}
