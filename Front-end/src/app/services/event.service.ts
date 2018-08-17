import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { Member } from '../model/member';
import { Type } from '../model/type';

export interface EventData {
  events: Event[];
  members: Member[];
  types: Type[];
}
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080/edit-events';
  private activeEventsAPI = 'http://localhost:8080/events';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addEvent(event: Event, selectedDiscipline, selectedMembers: Member[]): Observable<any> {
    const eventData: EventData = {events: [event], types: [selectedDiscipline], members: selectedMembers}
    return this.http.post(`${this.baseUrl}/add`, eventData);
  }

  updateEvent(event: Event, selectedDiscipline, selectedMembers: Member[]): Observable<any> {
    const updateData: EventData = {events: [event], types: [selectedDiscipline], members: selectedMembers}
    return this.http.post(`${this.baseUrl}/edit`, updateData);
  }

  getActiveEvents(): Observable<any> {
    return this.http.get(`${this.activeEventsAPI}`);
  }

  giveChosenParams(chosenDiscipline: String, chosenStatus: String): Observable<any> {
    return this.http.post(`${this.activeEventsAPI}/${chosenDiscipline}/${chosenStatus}`, { responseType: 'text' });
  }

}
