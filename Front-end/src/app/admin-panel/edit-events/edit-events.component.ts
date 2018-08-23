import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../model/event';
import { Member } from '../../model/member';
import { Type } from '../../model/type';
import { ErrorStateMatcher } from '../../../../node_modules/@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '../../../../node_modules/@angular/forms';

//Validation
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

  constructor(private eventService: EventService, public dialog: MatDialog) {

  }

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

constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<DeleteEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

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

  //name
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  matcherName = new MyErrorStateMatcher();

  //begin date
  beginDateFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherBeginDate = new MyErrorStateMatcher();

  //end date
  endDateFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherEndDate = new MyErrorStateMatcher();

  //discipline
  disciplineFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherDiscipline = new MyErrorStateMatcher();

  //members
  membersFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherMembers = new MyErrorStateMatcher();

  constructor(private eventService: EventService,
    public dialogRef: MatDialogRef<EditEventModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit,
    public dialog: MatDialog
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
    this.nameFormControl.setValue(this.event.name);
    this.beginDateFormControl.setValue(this.event.beginDate);
    this.endDateFormControl.setValue(this.event.endDate);
    this.disciplineFormControl.setValue(this.event.type.id);
    this.membersFormControl.setValue(this.event.members.map(x => x.id));
  }


  editEvent(flag: number) {
    this.event.name = this.nameFormControl.value;
    this.event.beginDate = this.beginDateFormControl.value;
    this.event.endDate = this.endDateFormControl.value;
    this.choosenTypeId = this.disciplineFormControl.value;
    this.choosenMemberId = this.membersFormControl.value;
    this.selectedType = this.types.find(x => this.choosenTypeId === x.id);
    this.selectedMembers = this.members.filter(x => this.choosenMemberId.some(y => y == x.id));
    this.eventService.updateEvent(this.event, this.selectedType, this.selectedMembers)
        .subscribe(
          data => {
            this.dialogRef.close();
            this.eventService.checkEventsActivity().subscribe(
              error => console.log(error)
            )
            if(flag) { window.location.reload(); }
          },
          error => console.log(error));
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

    //eventName
    eventNameFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherEventName = new MyErrorStateMatcher();

    //beginDate
    beginDateFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherBeginDate = new MyErrorStateMatcher();

    //endDate
    endDateFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherEndDate = new MyErrorStateMatcher();

    //selectedDiscipline
    selectedDisciplineFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherSelectedDiscipline = new MyErrorStateMatcher();

    //selectedMembers
    selectedMembersFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherSelectedMembers = new MyErrorStateMatcher();


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

    if(this.eventNameFormControl.errors==null
      && this.beginDateFormControl.errors==null
      && this.endDateFormControl.errors==null
      && this.selectedDisciplineFormControl.errors==null
      && this.selectedMembersFormControl.errors==null) {
      this.event.name = this.eventNameFormControl.value;
      this.event.beginDate = this.beginDateFormControl.value;
      this.event.endDate = this.endDateFormControl.value;
      this.selectedType = this.selectedDisciplineFormControl.value;
      this.selectedMembers = this.selectedMembersFormControl.value;
      this.event.active = true;
      this.eventService.addEvent(this.event, this.selectedType, this.selectedMembers)
        .subscribe(
          data => {
            this.dialogRef.close();
            window.location.reload();
          },
          error => console.log(error));
    } else {
      alert("Błędnie wprowadzone dane!");
    }

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

ngOnInit(){
   this.eventService.getUserList(this.data.id).subscribe(data => {
    this.userList = data;
    console.log(this.userList);
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

  //member
  memberFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherMember = new MyErrorStateMatcher();

  //result
  resultFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherResult = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<ResolveEventModal>,
              private eventService: EventService,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataEdit
  ) {
    this.event = this.data.event;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onResolveClick(): void {
    if(this.memberFormControl.value == -1) { this.event.winner = "Remis"; }
    else { this.event.winner = this.memberFormControl.value; }
    this.event.score = this.resultFormControl.value;
    this.eventService.resolveEvent(this.event).subscribe(
      data => {
        this.dialogRef.close();
        window.location.reload();
      },
      error => console.log(error)
    );

  }

}
