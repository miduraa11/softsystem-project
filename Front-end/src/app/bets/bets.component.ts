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

  constructor(private betsService: BetsService) { }

  ngOnInit() {
    this.betsService.getAllBets().subscribe(data => { console.log(data);
        this.bets = data;
      });
  }

}
