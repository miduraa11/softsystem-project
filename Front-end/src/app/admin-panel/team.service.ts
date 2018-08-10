import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 
  private baseUrl = 'http://localhost:8080/edit-teams';
 
  //team : Member = { name: ""} 

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/edit-teams');
  }
/*
  get(id: string) {
    return this.http.get('//localhost:8080/edit-teams' + '/' + id);
  }

  save(team: any): Observable<any> {
    let result: Observable<Object>;
    if (team['href']) {
      result = this.http.put(team.href, team);
    } else {
      result = this.http.post(this.CAR_API, team);
    }
    return result;
  }
*/
  deleteTeam(id : number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType: 'text'});
  }

  addTeam(team: string){
    console.log(team);
     return this.http.post(`${this.baseUrl}/${team}`,{responseType: 'text'});
  }

}
/*
interface Member{
  name: String;
}
*/