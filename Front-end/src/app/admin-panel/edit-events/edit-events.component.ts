import { Component, OnInit, Inject, Input } from '@angular/core';
import { EventService } from '../../event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
import { Event } from '../../model/event';

export interface DialogData {
  id: number;
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
 
  events: Array<any>;

  constructor(private eventService: EventService, public dialog: MatDialog) { }


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
        data: {event: event}
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

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<EditEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editEvent() {
        
  }

}



