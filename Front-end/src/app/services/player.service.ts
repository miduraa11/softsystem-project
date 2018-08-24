import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PlayerService {
  public API = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  
  getPlayers(): Observable<any> {
    return this.http.get(this.API + '/edit-players');
  }

  updatePlayer(id: number, name: String, discipline: String): Observable<any> {
    return this.http.post(`${this.API}/edit-players/edit/${id}/${name}/${discipline}`, { responseType: 'text' });
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.get(`${this.API}/edit-players/${id}`, { responseType: 'text' });
  }

  addPlayer(name: String, discipline: String): Observable<any> {
    return this.http.post(`${this.API}/edit-players/add/${name}/${discipline}`, { responseType: 'text' });
  }

}