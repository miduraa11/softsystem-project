import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { Type } from '../model/type';
import { Event } from '../model/event';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher, MatSnackBar } from '../../../node_modules/@angular/material';
import { BetsService } from '../services/bets.service';
import { FormControl, Validators, FormGroup } from '../../../node_modules/@angular/forms';
import { Bet } from '../model/bet';
import { User } from '../model/user';

export interface DialogData {
  event: Event;
  currentUser: number;
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

  constructor(private eventService: EventService,
    public dialog: MatDialog
  ) { }
 
  ngOnInit(): void {
    this.currentUser = Number(localStorage.getItem(this.key));
    this.eventService.giveChosenParams(this.chosenDiscipline, this.chosenStatus).subscribe(
      data => {
        console.log("Success"),
        this.eventService.getActiveEvents().subscribe(
          data => {
            this.events = data.events;
            this.types = data.types;
            this.chosenDiscipline = data.chosenDiscipline;
            this.chosenStatus = data.chosenStatus;
          }
        )
      },
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

  openGeneralBetDialog(event: Event): void {
    const dialogRef = this.dialog.open(BetTheBetGeneralDialog, {
      width: '450px',
      data: { event,  currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDetailBetDialog(event: Event): void {
    const dialogRef = this.dialog.open(BetTheBetDetailDialog, {
      width: '450px',
      data: { event,  currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'bet-the-bet-general-dialog',
  templateUrl: './bet-the-bet-general-dialog.html',
})
export class BetTheBetGeneralDialog implements OnInit {

  event: Event;
  bet: Bet;
  currentUser: number;

  generalBetForm = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\d+\\.\\d{0,2}$")
    ]),
    member: new FormControl('', [
      Validators.required
    ])
  });

  constructor( private betService: BetsService,
    public dialogRef: MatDialogRef<BetTheBetGeneralDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.event = this.data.event;
    this.currentUser = this.data.currentUser;
    this.bet = new Bet();
    this.bet.user = new User();
  }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onBetClick(event: Event): void {
    if(this.generalBetForm.valid) {
      this.bet.amount = this.generalBetForm.get('amount').value;
      if(this.generalBetForm.get('member').value != -1) { this.bet.member = this.generalBetForm.get('member').value; }
      else { this.bet.member = null; }
      this.bet.event = event;
      this.bet.general = true;
      this.bet.user.id = this.data.currentUser;
      this.betService.addBet(this.bet).subscribe(
        data => {
          this.openConfirmDialog();
          this.dialogRef.close();
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
  selector: 'bet-the-bet-detail-dialog',
  templateUrl: './bet-the-bet-detail-dialog.html',
})
export class BetTheBetDetailDialog implements OnInit {

  event: Event;
  bet: Bet;
  currentUser: number;

  detailBetForm = new FormGroup({
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

  constructor(private betService: BetsService,
    public dialogRef: MatDialogRef<BetTheBetDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.event = this.data.event;
    this.currentUser = this.data.currentUser;
    this.bet = new Bet();
    this.bet.user = new User();
  }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onBetClick(event : Event): void {
    if(this.detailBetForm.valid) {
      this.bet.amount = this.detailBetForm.get('amount').value;
      if(this.detailBetForm.get('member').value != -1) { this.bet.member = this.detailBetForm.get('member').value; }
      else { this.bet.member = null; }
      this.bet.result = this.detailBetForm.get('result').value;
      this.bet.event = event;
      this.bet.general = false;
      this.bet.user.id = this.data.currentUser;
      this.betService.addBet(this.bet).subscribe(
        data => {
          this.openConfirmDialog();
          this.dialogRef.close();
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