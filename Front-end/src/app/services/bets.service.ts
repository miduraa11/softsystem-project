import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Member } from '../model/member';
import { Event } from '../model/event';

export interface BetData {
  event: Event;
  currentUser: number;
  amount: number;
  chosenMember: number;
  result: String;
  betType: number;
}

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private baseUrl = 'http://localhost:8080/bets';
  private addUrl = 'http://localhost:8080/events/addBet';

  constructor(private http: HttpClient) { }

  getAllBetsById(currentUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${currentUser}`);
  }

  getActiveBets(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addBet(currentUser: number, event: Event, amount: number, chosenMember: number, result: String, betType: number): Observable<any> {
    const betData: BetData = {event: event, currentUser: currentUser, amount: amount, chosenMember: chosenMember, result: result, betType: betType}
    return this.http.post(`${this.addUrl}`, betData);
  }

  giveChosenParams(chosenStatus: String, currentUser: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${chosenStatus}/${currentUser}`, { responseType: 'text' });
  }
}
