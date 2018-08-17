import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../model/event';
import { Member } from '../../model/member';
import { Type } from '../../model/type';

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


@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {
  
  id: number;
  member: Member;
  type: Type;
  events: Event[];
  selectedMembers: Member[];
  copyOfEvent: Event;
  constructor(private eventService: EventService, public dialog: MatDialog) {}


  ngOnInit() {
        this.eventService.getAll().subscribe(data => {
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
        data: {event: event},
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

  event: Event;
  members: Member[];
  types: Type[];
  choosenTypeId: number;
  choosenMemberId: number[];
  selectedDiscipline: Type;
  selectedMembers: Member[];

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<EditEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit) {}

  onNoClick(): void {
    this.event = Object.assign({}, this.event);
    this.dialogRef.close();
    window.location.reload();
  }

  ngOnInit() {
    this.eventService.getAll().subscribe(data => {
      this.event = this.data.event;
      this.types = data.types;
      this.members = data.members;
      this.choosenTypeId = this.data.event.type.id;  
      this.choosenMemberId = this.data.event.members.map(x => x.id);
    });
  }

  editEvent() {
    this.selectedDiscipline = this.types.find(x => this.choosenTypeId === x.id)
    this.selectedMembers = this.members.filter(x => this.choosenMemberId.some(y => y == x.id))
    this.eventService.updateEvent(this.event, this.selectedDiscipline, this.selectedMembers)
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
  selectedDiscipline: Type[];
  selectedMembers: Member[];

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<CreateEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.eventService.getAll().subscribe(data => {
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



