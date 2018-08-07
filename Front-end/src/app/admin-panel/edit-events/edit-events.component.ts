import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {
  
  events: Array<any>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
        this.eventService.getAll().subscribe(data => {
        this.events = data;
      });
    }
}
