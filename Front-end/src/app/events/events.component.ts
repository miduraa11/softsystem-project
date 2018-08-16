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
  i: number;

  constructor(private eventService: EventService) {

  }
 
  ngOnInit() {  
    this.eventService.giveChosenDiscipline(this.chosenDiscipline).subscribe(
      data => { console.log("Success"),
      this.eventService.getActiveEvents().subscribe(data => {
        this.events = data.events;
        this.types = data.types;
        this.chosenDiscipline = data.chosenDiscipline;
      })},
      error => console.log(error)      
    );
  }

  updateList(chosenDiscipline: String): void {
    this.chosenDiscipline = chosenDiscipline;
    this.eventService.giveChosenDiscipline(this.chosenDiscipline).subscribe(
      data => { console.log("Success"),
      this.eventService.getActiveEvents().subscribe(data => {
        this.events = data.events;
        this.types = data.types;
        this.chosenDiscipline = data.chosenDiscipline;
      })},
      error => console.log(error)
    );
  }

}
