import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })

export class UserService {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  
  getUsers(): Observable<any> {
    return this.http.get(`${this.API}/edit-users`);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.get(`${this.API}/edit-users/delete/${user.id}`, { responseType: 'text' });
  }

}