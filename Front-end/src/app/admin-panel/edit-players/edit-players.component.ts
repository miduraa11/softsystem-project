import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Member } from '../../model/member';

export interface DialogData {
  id: number;
}

export interface DialogData2 {
  name: String;
  discipline: String;
}

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.css']
})
export class EditPlayersComponent implements OnInit {
  
  id: number;
  players: Array<any>;
  player: Member;
  
  constructor(private playerService: PlayerService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
    });    
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(RemovePlayerDialog, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(name: String, discipline: String): void {
    const dialogRef = this.dialog.open(PlayerEditDialog, {
      width: '400px',
      data: { name: name, discipline: discipline }
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

  @Input() player: Member;

  constructor( private playerService: PlayerService, public dialogRef: MatDialogRef<RemovePlayerDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.playerService.deletePlayer(this.data.id).subscribe(
      data => { console.log(data); this.dialogRef.close(); window.location.reload(); },
      error => console.log(error)      
    );  
  }

}

@Component({
  selector: 'player-edit-dialog',
  templateUrl: './player-edit-dialog.html',
})
export class PlayerEditDialog {

  player: Member;

  constructor( private playerService: PlayerService, public dialogRef: MatDialogRef<PlayerEditDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData2) {

  }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.player.name = this.data.name;
    this.player.type.discipline = this.data.discipline;
    this.playerService.updatePlayer(this.player).subscribe(
      data => { console.log(data); this.dialogRef.close(); window.location.reload(); },
      error => console.log(error)      
    );
  }

}