import { Component, OnInit, Inject, Input } from '@angular/core';
import { EventService } from '../../event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
import { Event } from '../../model/event';

export interface DialogData {
  id: number;
}

export interface DialogDataAdd {
  event: Event;
  member: Member;
  type: Type;
}

export interface DialogDataEdit {
  event: Event;
}

export interface DialogData {
  id: number;
}

export interface Event {
	id: number;
	name: string;
	beginDate: string;
	endDate: string;
	active: boolean;
	result: string;
}

export interface Member {
	id: number;
  name: string;
}

export interface Type {
	id: number;
	discipline: string;
}

export interface EventData {
	events: Event[];
	members: Member[];
	types: Type[];
}

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {
  
  id: number;
  event: Event = {id: null, name: null, active: null, endDate: null, beginDate: null, result: null, type: null};
  member: Member;
  type: Type;
  events: EventData;

  constructor(private eventService: EventService, public dialog: MatDialog) { }


  ngOnInit() {
        this.eventService.getAll().subscribe(data => { console.log(data)
        this.events = data;
      });
    }

    openDeleteDialog(id: number): void {
      const dialogRef = this.dialog.open(DeleteEventModal, {
        width: '400px',
        data: {id: id}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    openEditDialog(event: Event): void{
      const dialogRef = this.dialog.open(EditEventModal, {
        width: '600px',
        data: {event: event}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    }

    openCreateDialog(): void{
      const dialogRef = this.dialog.open(CreateEventModal, {
        width: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });


    }



}

@Component({
  selector: 'delete-event-modal',
  templateUrl: './delete-event-modal.html',
})
export class DeleteEventModal {

  @Input() event: Event;

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<DeleteEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.data.id)
      .subscribe(
        data => {
          console.log(data);
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));
        
  }

}


@Component({
  selector: 'edit-event-modal',
  templateUrl: './edit-event-modal.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventModal {

  @Input() event: Event;

  members: EventData;
  types: EventData;
  
  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<EditEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.eventService.getAll().subscribe(data => { console.log(data)
    this.types = data.types;
    this.members = data.members;
  });
}

editEvent() {
}

}



@Component({
  selector: 'create-event-modal',
  templateUrl: './create-event-modal.html',
  styleUrls: ['./edit-events.component.css']
})
export class CreateEventModal {

  event: any = {};

  members: EventData;
  types: EventData;
  selectedDiscipline: Type[];
  selectedMembers: Member[];

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<CreateEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.eventService.getAll().subscribe(data => { console.log(data)
    this.types = data.types;
    this.members = data.members;
  });
}

addEvent() {
  this.eventService.addEvent(this.event, this.selectedDiscipline, this.selectedMembers)
      .subscribe(
        data => {
          console.log(data);
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));
}

}



