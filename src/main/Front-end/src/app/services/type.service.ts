import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class TypeService {

  public baseUrl = '/api';
  public eventsUrl = '/api/events';

  constructor(private http: HttpClient) { }
  
  getTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit-players/types`);
  }

  getAllTypes(): Observable<any> {
    return this.http.get(`${this.eventsUrl}/getTypes`);
  }

}
