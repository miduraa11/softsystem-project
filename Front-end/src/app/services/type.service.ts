import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class TypeService {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  
  getTypes(): Observable<any> {
    return this.http.get(this.API + '/edit-players/types');
  }

}