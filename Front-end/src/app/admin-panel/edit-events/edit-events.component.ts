import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../model/event';
import { Member } from '../../model/member';
import { Type } from '../../model/type';

export interface DialogData {
  id: number;
}

export interface DialogDataEdit {
  id: number;
  name: String;
  beginDate: Date;
  endDate: Date;
  type: Type;
  members: Member[];
  active: boolean;
  winner: String;
  result: String;
}

export interface DialogDataCreate {
  event: Event;
}


@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {
  
  events: Event[];

  constructor(private eventService: EventService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
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

  openEditDialog(event: Event): void {
    const dialogRef = this.dialog.open(EditEventModal, {
      width: '600px',
      data: {
        id: event.id,
        name: event.name,
        beginDate: event.beginDate,
        endDate: event.endDate,
        type: event.type,
        members: event.members,
        active: event.active,
        winner: event.winner,
        result: event.result
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCreateDialog(): void {
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

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<DeleteEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.data.id).subscribe(
      data => {
        this.dialogRef.close();
        window.location.reload();
      },
      error => console.log(error));        
  }

}

@Component({
  selector: 'edit-event-modal',
  templateUrl: './edit-event-modal.html'
})
export class EditEventModal {

  event: Event;
  members: Member[];
  types: Type[];
  choosenTypeId: number;
  choosenMemberId: number[];
  selectedType: Type;
  selectedMembers: Member[];

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<EditEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.event = { id: this.data.id, name: this.data.name, beginDate: this.data.beginDate, endDate: this.data.endDate, active: this.data.active, result: this.data.result, type: this.data.type, members: this.data.members, winner: this.data.winner };
    this.eventService.getTypesAndMembers().subscribe(data => {
      this.types = data.types;
      this.members = data.members;
      this.choosenTypeId = this.data.type.id;
      this.choosenMemberId = this.data.members.map(x => x.id);
    });
  }

  editEvent() {
    this.selectedType = this.types.find(x => this.choosenTypeId === x.id);
    this.selectedMembers = this.members.filter(x => this.choosenMemberId.some(y => y == x.id));
    this.eventService.updateEvent(this.event, this.selectedType, this.selectedMembers)
        .subscribe(
          data => {
            this.dialogRef.close();
            window.location.reload();
          },
          error => console.log(error));
  }

}

@Component({
  selector: 'create-event-modal',
  templateUrl: './create-event-modal.html',
  styleUrls: ['./edit-events.component.css']
})
export class CreateEventModal {

  event: any = {};
  members: Member[];
  types: Type[];
  selectedType: Type;
  selectedMembers: Member[];

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<CreateEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreate) {
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.eventService.getTypesAndMembers().subscribe(data => {
      this.types = data.types;
      this.members = data.members;
    });
  }

  addEvent() {
    this.eventService.addEvent(this.event, this.selectedType, this.selectedMembers)
        .subscribe(
          data => {
            this.dialogRef.close();
            window.location.reload();
          },
          error => console.log(error));
  }

}



