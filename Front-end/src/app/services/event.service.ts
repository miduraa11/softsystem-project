import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { Member } from '../model/member';
import { Type } from '../model/type';

export interface EventData {
  event: Event;
  members: Member[];
  types: Type[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080/edit-events';
  private activeEventsAPI = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {

  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTypesAndMembers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/info`);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  addEvent(event: Event, selectedType: Type, selectedMembers: Member[]): Observable<any> {
    const eventData: EventData = {event: event, types: [selectedType], members: selectedMembers}
    return this.http.post(`${this.baseUrl}/add`, eventData);
  }

  updateEvent(event: Event, selectedType: Type, selectedMembers: Member[]): Observable<any> {
    const eventData: EventData = {event: event, types: [selectedType], members: selectedMembers}
    return this.http.post(`${this.baseUrl}/edit`, eventData);
  }

  getActiveEvents(): Observable<any> {
    return this.http.get(`${this.activeEventsAPI}`);
  }

  giveChosenParams(chosenDiscipline: String, chosenStatus: String): Observable<any> {
    return this.http.post(`${this.activeEventsAPI}/${chosenDiscipline}/${chosenStatus}`, { responseType: 'text' });
  }

  getUserList(eventId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/userList/${eventId}`);
  }

  resolveEvent(event: Event): Observable<any> {
    return this.http.post(`${this.baseUrl}/resolve`, event);
  }

  checkEventsActivity(): Observable<any> {
    return this.http.post(`http://localhost:8080/checkEventsActivity`, { responseType: 'text' });
  }

}
