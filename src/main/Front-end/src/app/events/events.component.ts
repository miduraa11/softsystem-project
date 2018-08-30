import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { Type } from '../model/type';
import { Event } from '../model/event';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BetsService } from '../services/bets.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Bet } from '../model/bet';
import { User } from '../model/user';
import { TypeService } from '../services/type.service';
import { Member } from '../model/member';

const USER_ID = 'User id';

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
  empty: boolean;

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
    this.currentUser = Number(sessionStorage.getItem(USER_ID));
    this.eventService.getActiveEvents(this.chosenDiscipline, this.chosenStatus).subscribe(data => {
      this.events = data;
      if(this.events.length ==0)
        this.empty = true;
      else
        this.empty = false;
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.chosenDiscipline = value.chosenDiscipline;
      this.chosenStatus = value.chosenStatus;
      this.eventService.getActiveEvents(this.chosenDiscipline, this.chosenStatus).subscribe(data => {
        this.events = data;
        if(this.events.length ==0)
          this.empty = true;
        else
          this.empty = false;
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
  styleUrls: ['./bet-the-bet-dialog.css']
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
    this.bet.member = new Member();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onBetClick(event: Event): void {
    if(this.flag == 1) { this.betForm.get('result').setErrors(null); }
    if(this.betForm.valid) {
      this.bet.amount = this.betForm.get('amount').value;
      this.bet.member.id = this.betForm.get('member').value;
      this.bet.event = event;
      this.bet.user.id = this.data.currentUser;
      if(this.flag == 1)  { this.bet.general = true; }
      else {
        this.bet.general = false;
        this.bet.result = this.betForm.get('result').value;
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
  templateUrl: './bet-the-bet-confirm-dialog.html'
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
