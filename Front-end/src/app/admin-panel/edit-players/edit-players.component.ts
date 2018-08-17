import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Member } from '../../model/member';
import { PlayerService } from '../../services/player.service';
import { TypeService } from '../../services/type.service';

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

  players: Array<any>;

  constructor(private playerService: PlayerService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
    });    
  }

  openDeleteDialog(id: number): void {
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialog, {
      width: '400px',
      data: {id: null, name: null, discipline: null}
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

  constructor( private typeService: TypeService,
    private playerService: PlayerService, public dialogRef: MatDialogRef<PlayerEditDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData2) {
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

@Component({
  selector: 'new-player-dialog',
  templateUrl: './new-player-dialog.html',
})
export class AddPlayerDialog implements OnInit {

  types: Array<any>;

  constructor( private typeService: TypeService,
      private playerService: PlayerService,
      public dialogRef: MatDialogRef<AddPlayerDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData2) {
  }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typeService.getTypes().subscribe(data =>{
      this.types = data;
    });
  }

  onAddClick(data: DialogData2): void {
    this.playerService.addPlayer(data.name, data.discipline).subscribe(
      data => { console.log("Success"); this.dialogRef.close(); window.location.reload(); },
      error => console.log(error)      
    );
  }

}