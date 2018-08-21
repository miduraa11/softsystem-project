import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { Type } from '../model/type';
import { Event } from '../model/event';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '../../../node_modules/@angular/material';
import { BetsService } from '../services/bets.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '../../../node_modules/@angular/forms';

export interface DialogData {
  event: Event;
  currentUser: number;
}

//Validation 
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  currentUser: number;
  key: string = "User id";

  constructor(private eventService: EventService, public dialog: MatDialog) {

  }
 
  ngOnInit() {
    this.currentUser = Number(localStorage.getItem(this.key));
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

  openBetDialog(event: Event): void {
    const dialogRef = this.dialog.open(BetTheBetDialog, {
      width: '450px',
      data: { event: event,  currentUser: this.currentUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'bet-the-bet-dialog',
  templateUrl: './bet-the-bet-dialog.html',
})
export class BetTheBetDialog implements OnInit {

  event: Event;
  amount: number;
  chosenMember: number;
  result: String;

  //amount
  amountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^\\d+\\.\\d{0,2}$"),
  ]);
  matcherAmount = new MyErrorStateMatcher();

  //member
  memberFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherMember = new MyErrorStateMatcher();

  //result
  resultFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^\\d+\\-\\d{1,}$"),
  ]);
  matcherResult = new MyErrorStateMatcher();

  constructor( private betService: BetsService, public dialogRef: MatDialogRef<BetTheBetDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.event = this.data.event;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onBetClick(event : Event): void {
    if(this.amountFormControl.errors==null && this.memberFormControl.errors==null && this.resultFormControl.errors==null) {
      this.amount = this.amountFormControl.value;
      this.chosenMember = this.memberFormControl.value;
      this.result = this.resultFormControl.value;
      this.betService.addBet(this.data.currentUser, event, this.amount, this.chosenMember, this.result).subscribe(
        data => {
          this.openConfirmDialog();
          this.dialogRef.close();
        },
        error => console.log(error)
      );
    } else {
      alert("Błędnie wprowadzone dane!");
    }
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(BetTheBetConfirmDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'bet-the-bet-confirm-dialog',
  templateUrl: './bet-the-bet-confirm-dialog.html',
})
export class BetTheBetConfirmDialog {

  constructor( public dialogRef: MatDialogRef<BetTheBetConfirmDialog> ) {

  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}