import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { Type } from '../model/type';
import { Event } from '../model/event';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '../../../node_modules/@angular/material';
import { BetsService } from '../services/bets.service';
import { FormControl, Validators, FormGroup } from '../../../node_modules/@angular/forms';
import { Bet } from '../model/bet';
import { User } from '../model/user';
import { TypeService } from '../services/type.service';

export interface DialogData {
  event: Event;
  currentUser: number;
  flag: number;
}

export interface ConfirmDialogData {
  error: number;
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

  filterForm = new FormGroup({
    chosenDiscipline: new FormControl(this.chosenDiscipline),
    chosenStatus: new FormControl(this.chosenStatus)
  });

  constructor(private eventService: EventService,
    private typeService: TypeService,
    public dialog: MatDialog
  ) { }
 
  ngOnInit(): void {
    this.typeService.getAllTypes().subscribe(data => {
      this.types = data;
    });
    this.currentUser = Number(localStorage.getItem(this.key));
    this.eventService.getActiveEvents(this.chosenDiscipline, this.chosenStatus).subscribe(data => {
      this.events = data;
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.chosenDiscipline = value.chosenDiscipline;
      this.chosenStatus = value.chosenStatus;
      this.eventService.getActiveEvents(this.chosenDiscipline, this.chosenStatus).subscribe(data => {
        this.events = data;
      });
    });
  }

  openBetDialog(event: Event, flag: number): void {
    const dialogRef = this.dialog.open(BetTheBetDialog, {
      width: '450px',
      data: { event,  currentUser: this.currentUser, flag }
    });
  }

}

@Component({
  selector: 'bet-the-bet-dialog',
  templateUrl: './bet-the-bet-dialog.html',
})
export class BetTheBetDialog {

  event: Event;
  bet: Bet;
  currentUser: number;
  flag: number;
  error: number;

  betForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\d+\\.\\d{0,2}$")
    ]),
    member: new FormControl('', [
      Validators.required
    ]),
    result: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\d+\\-\\d{1,}$")
    ])
  });

  constructor(public dialogRef: MatDialogRef<BetTheBetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private betService: BetsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.flag = this.data.flag;
    this.event = this.data.event;
    this.currentUser = this.data.currentUser;
    this.bet = new Bet();
    this.bet.user = new User();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onBetClick(event: Event): void {
    if(this.flag == 1) { this.betForm.get('result').setErrors(null); }
    if(this.betForm.valid) {
      this.bet.amount = this.betForm.get('amount').value;
      if(this.betForm.get('member').value != -1) { this.bet.member = this.betForm.get('member').value; }
      else { this.bet.member = null; }
      this.bet.event = event;
      this.bet.user.id = this.data.currentUser;
      switch(this.flag) {
        case 1: {
          this.bet.general = true;
          break;
        }
        case 2: {
          this.bet.general = false;
          this.bet.result = this.betForm.get('result').value;
          break;
        }
      }
      this.betService.addBet(this.bet).subscribe(data => {
        this.error = data;
        this.openConfirmDialog(this.error);
        this.dialogRef.close();
      });
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000
    });
  }

  openConfirmDialog(error: number): void {
    const dialogRef = this.dialog.open(BetTheBetConfirmDialog, {
      width: '400px',
      data: { error }
    });
  }

}

@Component({
  selector: 'bet-the-bet-confirm-dialog',
  templateUrl: './bet-the-bet-confirm-dialog.html',
})
export class BetTheBetConfirmDialog {

  error: number;

  constructor(public dialogRef: MatDialogRef<BetTheBetConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {
    this.error = this.data.error;
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}