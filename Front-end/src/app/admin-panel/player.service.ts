import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PlayerService {
  public API = '//localhost:8080';
  public PLAYER_API = this.API + '/players';

  constructor(private http: HttpClient) {
  }
  
  getPlayers(): Observable<any> {
    return this.http.get(this.API + '/edit-players');
  }

  get(id: string) {
    return this.http.get(this.PLAYER_API + '/' + id);
  }

  save(player: any): Observable<any> {
    let result: Observable<Object>;
    if (player['href']) {
      result = this.http.put(player.href, player);
    } else {
      result = this.http.post(this.PLAYER_API, player);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}