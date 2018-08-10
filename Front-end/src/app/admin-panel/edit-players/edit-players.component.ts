import { Component, OnInit, Input, Inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Member } from '../../model/member';
import { TypeService } from '../type.service';
import { Type } from '../../model/type';

export interface DialogData {
  id: number;
}

export interface DialogData2 {
  id: number;
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

  openEditDialog(id: number, name: String, discipline: String): void {
    const dialogRef = this.dialog.open(PlayerEditDialog, {
      width: '400px',
      data: { id: id, name: name, discipline: discipline }
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
export class PlayerEditDialog implements OnInit {

  types: Array<any>;

  constructor( private typeService: TypeService, private playerService: PlayerService, public dialogRef: MatDialogRef<PlayerEditDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData2) {
  }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typeService.getTypes().subscribe(data =>{
      this.types = data;
    });
  }

  onSaveClick(data: DialogData2): void {
    this.playerService.updatePlayer(data.id, data.name, data.discipline).subscribe(
      data => { console.log("Success"); this.dialogRef.close(); window.location.reload(); },
      error => console.log(error)      
    );
  }

}