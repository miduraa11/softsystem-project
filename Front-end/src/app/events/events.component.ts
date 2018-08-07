import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 
  selectedEvent: Event;
 
  events: Event[];
 
  constructor() { }
 
  ngOnInit() {
  }
 
}
