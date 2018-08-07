import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.css']
})
export class EditPlayersComponent implements OnInit {
  players: Array<any>;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
    });
  }
}