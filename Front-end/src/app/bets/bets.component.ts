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


  constructor(private betsService: BetsService) { }

  ngOnInit() {
    this.currentUser = Number(localStorage.getItem(this.key));
    this.betsService.getAllBetsById(this.currentUser).subscribe(data => { console.log(data);
        this.bets = data;
      });
  }

}
