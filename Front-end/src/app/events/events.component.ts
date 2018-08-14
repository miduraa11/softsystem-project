import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 
  events: Event[];
 
  constructor(private eventService: EventService) {

  }
 
  ngOnInit() {
    this.eventService.getActiveEvents().subscribe(data => { console.log(data)
      this.events = data;
    });
  }

}
