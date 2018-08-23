import { Component, OnInit, Inject } from '@angular/core';
import { BetsService } from '../services/bets.service';
import { Bet } from '../model/bet';
import { Member } from '../model/member';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

export interface DialogData {
  event: Event;
}

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  bets: Bet[];
  key: string = "User id";
  currentUser: number;
  chosenStatus: String = "Wszystkie";

  constructor(private betsService: BetsService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.currentUser = Number(localStorage.getItem(this.key));
    this.betsService.getAllBetsById(this.currentUser).subscribe(
      data => {
        this.bets = data;
        for(var i = 0; i < this.bets.length; i++) {
          if(this.bets[i].member == null) { 
            this.bets[i].member = new Member;
            this.bets[i].member.name = "Remis";
          }
        }
      }
    );
  }

  updateList(chosenStatus: String): void {

    this.chosenStatus = chosenStatus;
    this.betsService.giveChosenParams(this.chosenStatus, this.currentUser).subscribe(
      data => { console.log("Success"),
      this.betsService.getActiveBets().subscribe(data => {
        this.bets = data;
        this.chosenStatus = chosenStatus;
      })},
      error => console.log(error)
    );
  }

  openInfoDialog(event: Event): void {
    const dialogRef = this.dialog.open(InfoDialog, {
      width: '400px',
      data: {event: event}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'info-dialog',
  templateUrl: './info-dialog.html',
})
export class InfoDialog {

  event: Event;

  constructor(
    public dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {  
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.event = this.data.event;
  }

}
