import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../model/event';
import { Member } from '../../model/member';
import { Type } from '../../model/type';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '../../../../node_modules/@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogData {
  id: number;
}

export interface DialogDataEdit {
  event: Event;
}

export interface UserList {
  userFirstName: string;
  userLastName: string;
  userPrize: number;
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
  
  eventIsFinished: boolean;
  events: Event[];

  constructor(private eventService: EventService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
    });
  }

  eventStatus(winner: string){
    if(winner!=null){
      this.eventIsFinished = true;
    } else {
      this.eventIsFinished = false;
    }
    return this.eventIsFinished;
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
      width: '450px',
      data: { event : event }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateEventModal, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUserListDialog(id: number){
    const dialogRef = this.dialog.open(UserListModal, {
      width: '500px',
      data: {id: id}
    });
  }

}

@Component({
  selector: 'delete-event-modal',
  templateUrl: './delete-event-modal.html',
})
export class DeleteEventModal {

  error: number;

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<DeleteEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) { }

  onCancelClick(): void {   
      this.dialogRef.close();
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.data.id).subscribe(
      data => {
        this.error = data;
        this.dialogRef.close();
        if(this.error == 0) { window.location.reload(); }
        else { this.openErrorInfoDialog(); }
      },
      error => console.log(error)
    );
  }

  openErrorInfoDialog(): void {
    const dialogRef = this.dialog.open(EventErrorInfoDialog, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  editForm = new FormGroup({
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

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<EditEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.event = this.data.event;
    this.event.beginDate = new Date(this.data.event.beginDate);
    this.event.endDate = new Date(this.data.event.endDate);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.eventService.getTypesAndMembers().subscribe(data => {
      this.types = data.types;
      this.members = data.members;
    });
    this.editForm.get('name').setValue(this.event.name);
    this.editForm.get('beginDate').setValue(this.event.beginDate);
    this.editForm.get('endDate').setValue(this.event.endDate);
    this.editForm.get('discipline').setValue(this.event.type.id);
    this.editForm.get('members').setValue(this.event.members.map(x => x.id));
  }


  editEvent(flag: number) {
    if(this.editForm.valid) {
      this.event.name = this.editForm.get('name').value;
      this.event.beginDate = this.editForm.get('beginDate').value;
      this.event.endDate = this.editForm.get('endDate').value;
      this.choosenTypeId = this.editForm.get('discipline').value;
      this.choosenMemberId = this.editForm.get('members').value;
      this.selectedType = this.types.find(x => this.choosenTypeId === x.id);
      this.selectedMembers = this.members.filter(x => this.choosenMemberId.some(y => y == x.id));
      this.eventService.updateEvent(this.event, this.selectedType, this.selectedMembers).subscribe(
        data => {
          this.dialogRef.close();
          this.eventService.checkEventsActivity().subscribe(
            error => console.log(error)
          )
          if(flag) { window.location.reload(); }
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

  resolveEventModal(event: Event): void {
    const dialogRef = this.dialog.open(ResolveEventModal, {
      width: '450px',
      data: {event: event}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  addForm = new FormGroup({
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

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<CreateEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreate,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.eventService.getTypesAndMembers().subscribe(data => {
      this.types = data.types;
      this.members = data.members;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addEvent(): void {
    if(this.addForm.valid) {
      this.event.name = this.addForm.get('name').value;
      this.event.beginDate = this.addForm.get('beginDate').value;
      this.event.endDate = this.addForm.get('endDate').value;
      this.selectedType = this.addForm.get('discipline').value;
      this.selectedMembers = this.addForm.get('members').value;
      this.eventService.addEvent(this.event, this.selectedType, this.selectedMembers).subscribe(
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

@Component({
  selector: 'user-list-modal',
  templateUrl: './user-list-modal.html',
  styleUrls: ['./edit-events.component.css']
})
export class UserListModal {

userList: UserList[];
displayedColumns: string[] = ['userFirstName', 'userLastName', 'userPrize'];


constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<UserListModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

ngOnInit() {
   this.eventService.getUserList(this.data.id).subscribe(data => {
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
  export class ResolveEventModal {

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

  constructor(public dialogRef: MatDialogRef<ResolveEventModal>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit,
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

@Component({
  selector: 'error-info-dialog',
  templateUrl: './error-info-dialog.html',
})
export class EventErrorInfoDialog {

  constructor(public dialogRef: MatDialogRef<EventErrorInfoDialog>) {  
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}