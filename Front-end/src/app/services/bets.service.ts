import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private baseUrl = 'http://localhost:8080/bets';

  constructor(private http: HttpClient) { }

  getAllBetsById(currentUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${currentUser}`);
  }
}
