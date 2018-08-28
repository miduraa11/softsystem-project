import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080/edit-events';
  private activeEventsAPI = 'http://localhost:8080/events';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTypesAndMembers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/info`);
  }

  deleteEvent(event: Event): Observable<any> {
    return this.http.get(`${this.baseUrl}/${event.id}`, { responseType: 'text' });
  }

  addEvent(event: Event): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, event, { responseType: 'text' });
  }

  updateEvent(event: Event): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit`, event);
  }

  getActiveEvents(chosenDiscipline: String, chosenStatus: String): Observable<any> {
    return this.http.get(`${this.activeEventsAPI}/${chosenDiscipline}/${chosenStatus}`);
  }

  getUserList(eventId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/userList/${eventId}`);
  }

  resolveEvent(event: Event): Observable<any> {
    return this.http.post(`${this.baseUrl}/resolve`, event);
  }

}
