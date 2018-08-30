import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Member } from '../model/member';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 
  private baseUrl = 'http://localhost:8080/edit-teams';
 
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/edit-teams');
  }
  getAllType(): Observable<any> {
    return this.http.get('//localhost:8080/edit-teams/type');
  }

  deleteTeam(team: Member) : Observable<any> {
    return this.http.get(`${this.baseUrl}/${team.id}`,{ responseType: 'text' });
  }

  addTeam(team: Member): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, team, { responseType: 'text' });
  }

  editTeam(team: Member): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit`, team);
  }

}
