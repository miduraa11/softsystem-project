import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Type } from '../model/type';
import { Event } from '../model/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 
  events: Event[];
  types: Type[];
  chosenDiscipline: String = "Wszystkie";
  chosenStatus: String = "Wszystkie";

  constructor(private eventService: EventService) {

  }
 
  ngOnInit() {  
    this.eventService.giveChosenParams(this.chosenDiscipline, this.chosenStatus).subscribe(
      data => { console.log("Success"),
      this.eventService.getActiveEvents().subscribe(data => {
        this.events = data.events;
        this.types = data.types;
        this.chosenDiscipline = data.chosenDiscipline;
        this.chosenStatus = data.chosenStatus;
      })},
      error => console.log(error)      
    );
  }

  updateList(chosenDiscipline: String, chosenStatus: String): void {
    this.chosenDiscipline = chosenDiscipline;
    this.chosenStatus = chosenStatus;
    this.eventService.giveChosenParams(this.chosenDiscipline, this.chosenStatus).subscribe(
      data => { console.log("Success"),
      this.eventService.getActiveEvents().subscribe(data => {
        this.events = data.events;
        this.types = data.types;
        this.chosenDiscipline = data.chosenDiscipline;
        this.chosenStatus = data.chosenStatus;
      })},
      error => console.log(error)
    );
  }

}
