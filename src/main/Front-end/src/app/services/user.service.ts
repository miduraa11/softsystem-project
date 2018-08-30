import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class UserService {

  public API = '/api';

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get(`${this.API}/edit-users`);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.get(`${this.API}/edit-users/delete/${user.id}`, { responseType: 'text' });
  }

}
