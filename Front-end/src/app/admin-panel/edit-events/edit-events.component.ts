import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../model/event';
import { Member } from '../../model/member';
import { Type } from '../../model/type';
import { FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AdminDeleteObjectComponent } from '../admin-panel-delete-object.component';

export interface DialogData {
  event: Event;
  flag: number;
}

export interface UserList {
  userFirstName: string;
  userLastName: string;
  userPrize: number;
}

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {
  
  eventIsFinished: boolean;
  events: Event[];

  constructor(private eventService: EventService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      data => {
        this.events = data;
      },
      error => console.log(error)
    );
  }

  openDeleteObjectDialog(object: any, flag: number): void {
    const dialogRef = this.dialog.open(AdminDeleteObjectComponent, {
      width: '400px',
      data: { object, flag }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed')
      }
    );
  }

  openUpdateEventDialog(event: Event, flag: number):void {
    const dialogRef = this.dialog.open(UpdateEventDialog, {
      width: '450px',
      data: { event, flag }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed');
      }
    );
  }

  openUserListDialog(event: Event): void {
    const dialogRef = this.dialog.open(UserListModal, {
      width: '500px',
      data: { event }
    });
  }

}

@Component({
  selector: 'event-list-update',
  templateUrl: './event-list-update.html',
  styleUrls: ['./edit-events.component.css']
})
export class UpdateEventDialog {

  event: Event;
  members: Member[];
  types: Type[];
  chosenTypeId: number;
  chosenMemberId: number[];
  flag: number;

  updateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    beginDate: new FormControl('', [
      Validators.required
    ]),
    endDate: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ]),
    members: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(public dialogRef: MatDialogRef<UpdateEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private eventService: EventService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.flag = this.data.flag;
    if(this.flag == 0) { this.event = new Event(); }
    else { 
      this.event = this.data.event;
      this.event.beginDate = new Date(this.data.event.beginDate);
      this.event.endDate = new Date(this.data.event.endDate);
    }
  }

  ngOnInit() {
    this.eventService.getTypesAndMembers().subscribe(
      data => {
        this.types = data.types;
        this.members = data.members;
      },
      error => console.log(error)
    );
    if(this.flag == 1) {
      this.updateForm.get('name').setValue(this.event.name);
      this.updateForm.get('beginDate').setValue(this.event.beginDate);
      this.updateForm.get('endDate').setValue(this.event.endDate);
      this.updateForm.get('discipline').setValue(this.event.type.id);
      this.updateForm.get('members').setValue(this.event.members.map(x => x.id));
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateEvent(flag: number) {
    if(this.updateForm.valid) {
      this.event.name = this.updateForm.get('name').value;
      this.event.beginDate = this.updateForm.get('beginDate').value;
      this.event.endDate = this.updateForm.get('endDate').value;
      switch(this.flag) {
        case 0: {
          this.event.type = this.updateForm.get('discipline').value;
          this.event.members = this.updateForm.get('members').value;
          this.eventService.addEvent(this.event).subscribe(
            data => {
              this.dialogRef.close();
              window.location.reload();
            },
            error => console.log(error)
          );
          break;
        }
        case 1: {
          this.chosenTypeId = this.updateForm.get('discipline').value;
          this.chosenMemberId = this.updateForm.get('members').value;
          this.event.type = this.types.find(x => this.chosenTypeId == x.id);
          this.event.members = this.members.filter(x => this.chosenMemberId.some(y => y == x.id));
          this.eventService.updateEvent(this.event).subscribe(
            data => {
              this.dialogRef.close();
              this.eventService.checkEventsActivity().subscribe(
                error => console.log(error)
              )
              if(flag) { window.location.reload(); }
            },
            error => console.log(error)
          );
          break;
        }
        default: {
          console.log("error");
          break;
        }
      }
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000
    });
  }

  resolveEventDialog(event: Event): void {
    const dialogRef = this.dialog.open(ResolveEventDialog, {
      width: '450px',
      data: { event }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'user-list-modal',
  templateUrl: './user-list-modal.html',
  styleUrls: ['./edit-events.component.css']
})
export class UserListModal {

  event: Event;
  userList: UserList[];
  displayedColumns: string[] = ['userFirstName', 'userLastName', 'userPrize'];

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<UserListModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.event = this.data.event;
  }

  ngOnInit() {
    this.eventService.getUserList(this.event.id).subscribe(data => {
      this.userList = data;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


}

@Component({
  selector: 'resolve-event-modal',
  templateUrl: 'resolve-event-modal.html',
})
export class ResolveEventDialog {

  event: Event;

  resolveForm = new FormGroup({
    member: new FormControl('', [
      Validators.required
    ]),
    result: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\d+\\-\\d{1,}$")
    ])
  });

  constructor(public dialogRef: MatDialogRef<ResolveEventDialog>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) {
    this.event = this.data.event;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onResolveClick(): void {
    if(this.resolveForm.valid) {
      if(this.resolveForm.get('member').value == -1) { this.event.winner = "Remis"; }
      else { this.event.winner = this.resolveForm.get('member').value; }
      this.event.score = this.resolveForm.get('result').value;
      this.eventService.resolveEvent(this.event).subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error)
      );
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000
    });
  }

}
