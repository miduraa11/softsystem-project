import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 
  selectedEvent: Event;
 
  events: Event[];
 
  constructor(private eventService: EventService) { }
 
  ngOnInit() {
    this.getEvents();
  }
 
  onSelect(event: Event): void {
    this.selectedEvent = event;
  } 
// cos nie dziala ale potrzebuje getEvents do wyswietlenia
  getEvents(): void {
    this.eventService.getEvents()
        .subscribe(events => this.events = events);
  }
}
