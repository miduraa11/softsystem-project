import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../model/member';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class PlayerService {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  
  getPlayers(): Observable<any> {
    return this.http.get(this.API + '/edit-players');
  }

  updatePlayer(player: Member): Observable<any> {
    return this.http.post(`${this.API}/edit-players/edit`, player);
  }

  deletePlayer(player: Member): Observable<any> {
    return this.http.get(`${this.API}/edit-players/${player.id}`, { responseType: 'text' });
  }

  addPlayer(player: Member): Observable<any> {
    return this.http.post(`${this.API}/edit-players/add`, player, { responseType: 'text' });
  }

}
