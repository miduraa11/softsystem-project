import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member, Type, EventData} from './admin-panel/edit-events/edit-events.component';
import { Event } from './model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8080/edit-events';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/edit-events');
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

}
