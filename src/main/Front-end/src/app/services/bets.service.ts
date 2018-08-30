import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Bet } from '../model/bet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private baseUrl = 'http://localhost:8080/bets';
  private addUrl = 'http://localhost:8080/events/addBet';

  constructor(private http: HttpClient) { }

  // getAllBetsById(currentUser: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${currentUser}`);
  // }

  getActiveBetsByUser(chosenStatus: String, currentUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${chosenStatus}/${currentUser}`);
  }

  addBet(bet: Bet): Observable<any> {
    return this.http.post(`${this.addUrl}`, bet, { responseType: 'text' });
  }

  // giveChosenParams(chosenStatus: String, currentUser: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${chosenStatus}/${currentUser}`, { responseType: 'text' });
  // }
  
}
