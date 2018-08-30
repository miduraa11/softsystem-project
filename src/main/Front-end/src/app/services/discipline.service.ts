import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Type } from '../model/type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
 
  private baseUrl = 'http://localhost:8080/edit-discipline';
 
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteDiscipline(discipline: Type) : Observable<any> {
    return this.http.get(`${this.baseUrl}/${discipline.id}`, {responseType: 'text'});
  }

  addDiscipline(discipline: Type): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, discipline, {responseType: 'text'});
  }

  editDiscipline(discipline: Type): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit`, discipline);
  }

}
