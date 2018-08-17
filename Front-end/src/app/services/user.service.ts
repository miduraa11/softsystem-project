import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class UserService {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  
  getUsers(): Observable<any> {
    return this.http.get(`${this.API}/edit-users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API}/edit-users/delete/${id}`, { responseType: 'text' });
  }

}