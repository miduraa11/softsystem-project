import { Component, OnInit } from '@angular/core';
import { EVENTS } from '../eventList';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = EVENTS;
  

  constructor() { }

  ngOnInit() {
  }



} 
