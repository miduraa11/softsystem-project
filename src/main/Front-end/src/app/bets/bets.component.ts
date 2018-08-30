import { Component, OnInit, Inject } from '@angular/core';
import { BetsService } from '../services/bets.service';
import { Bet } from '../model/bet';
import { Member } from '../model/member';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';

const USER_ID = 'User id';

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
  currentUser: number;
  chosenStatus: String = "Wszystkie";
  empty: boolean;

  filterForm = new FormGroup({
    chosenStatus: new FormControl(this.chosenStatus)
  });

  constructor(private betsService: BetsService,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = Number(sessionStorage.getItem(USER_ID));
    this.betsService.getActiveBetsByUser(this.chosenStatus, this.currentUser).subscribe(data => {
      this.bets = data;
      if(this.bets.length ==0)
        this.empty = true;
      else
        this.empty = false;
      for(var i = 0; i < this.bets.length; i++) {
        if(this.bets[i].member == null) { 
          this.bets[i].member = new Member();
          this.bets[i].member.name = "Remis";
        }
      }
    });
    this.filterForm.get('chosenStatus').valueChanges.subscribe(value => {
      this.chosenStatus = value;
      this.betsService.getActiveBetsByUser(this.chosenStatus, this.currentUser).subscribe(data => {
        this.bets = data;
        if(this.bets.length ==0)
          this.empty = true;
        else
          this.empty = false;
        for(var i = 0; i < this.bets.length; i++) {
          if(this.bets[i].member == null) { 
            this.bets[i].member = new Member();
            this.bets[i].member.name = "Remis";
          }
        }
      });
    });
  }

  openInfoDialog(event: Event): void {
    const dialogRef = this.dialog.open(InfoDialog, {
      width: '400px',
      data: { event }
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
    this.event = this.data.event; 
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
