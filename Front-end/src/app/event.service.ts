import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from './event';
import { EVENTS } from './eventList';
import { MessageService } from './message.service';
 
@Injectable({
  providedIn: 'root',
})
export class EventService {
 
  constructor(private messageService: MessageService) { }
 
  getEvents(): Observable<Event[]> {
  
    this.messageService.add('EventService: fetched events');
    return of(EVENTS);
  }
}
