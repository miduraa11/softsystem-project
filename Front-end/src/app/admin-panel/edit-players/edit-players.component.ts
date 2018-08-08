import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.css']
})
export class EditPlayersComponent implements OnInit {
  
  players: Array<any>;

  constructor(private playerService: PlayerService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RemovePlayerDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'remove-player-dialog',
  templateUrl: './remove-player-dialog.html',
})
export class RemovePlayerDialog {

  constructor( public dialogRef: MatDialogRef<RemovePlayerDialog> ) {

  }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

}