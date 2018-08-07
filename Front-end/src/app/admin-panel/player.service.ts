import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {
    }
  
  getPlayers(): Observable<any> {
    return this.http.get('//localhost:8080/edit-players');
  }
}