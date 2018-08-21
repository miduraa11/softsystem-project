import { Component, OnInit } from '@angular/core';
import { BetsService } from '../services/bets.service';
import { Bet } from '../model/bet';

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

  constructor(private betsService: BetsService) { }

  ngOnInit() {
    this.currentUser = Number(localStorage.getItem(this.key));
    this.betsService.getAllBetsById(this.currentUser).subscribe(data => { console.log(data);
        this.bets = data;
      });
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

}
