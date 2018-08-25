import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PlayerService } from '../../services/player.service';
import { TypeService } from '../../services/type.service';
import { Validators, FormControl, FormGroup } from '../../../../node_modules/@angular/forms';

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
      width: '450px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(id: number, name: String, discipline: String): void {
    const dialogRef = this.dialog.open(PlayerEditDialog, {
      width: '450px',
      data: { id: id, name: name, discipline: discipline }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialog, {
      width: '450px',
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

  error: number;

  constructor(private playerService: PlayerService,
    public dialogRef: MatDialogRef<RemovePlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) { }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.playerService.deletePlayer(this.data.id).subscribe(
      data => {
        this.error = data;
        this.dialogRef.close();
        if(this.error == 0) { window.location.reload(); }
        else { this.openErrorInfoDialog(); }
      },
      error => console.log(error)
    );
  }

  openErrorInfoDialog(): void {
    const dialogRef = this.dialog.open(PlayerErrorInfoDialog, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'player-edit-dialog',
  templateUrl: './player-edit-dialog.html',
})
export class PlayerEditDialog implements OnInit {

  types: Array<any>;


  editForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ])
  });

  constructor( private typeService: TypeService,
    private playerService: PlayerService,
    public dialogRef: MatDialogRef<PlayerEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2,
    public snackBar: MatSnackBar
  ) { }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typeService.getTypes().subscribe(
      data => {
      this.types = data;
      this.editForm.get('name').setValue(this.data.name);
      this.editForm.get('discipline').setValue(this.data.discipline);
    });
  }

  onSaveClick(data: DialogData2): void {
    if(this.editForm.valid) {
      data.name = this.editForm.get('name').value;
      data.discipline = this.editForm.get('discipline').value;
      this.playerService.updatePlayer(data.id, data.name, data.discipline).subscribe(
        data => { 
          console.log("Success");
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error)
      );
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000
    });
  }

}

@Component({
  selector: 'new-player-dialog',
  templateUrl: './new-player-dialog.html',
})
export class AddPlayerDialog implements OnInit {

  types: Array<any>;

  addForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ])
  });    
    
  constructor( private typeService: TypeService,
    private playerService: PlayerService,
    public dialogRef: MatDialogRef<AddPlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2,
    public snackBar: MatSnackBar
    ) { }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typeService.getTypes().subscribe(
      data =>{
        this.types = data;
      }
    );
  }

  onAddClick(data: DialogData2): void {
    if(this.addForm.valid) {
      this.data.name = this.addForm.get('name').value;
      this.data.discipline = this.addForm.get('discipline').value;
      this.playerService.addPlayer(data.name, data.discipline).subscribe(
        data => {
          console.log("Success");
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error)
      );
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000
    });
  }

}

@Component({
  selector: 'error-info-dialog',
  templateUrl: './error-info-dialog.html',
})
export class PlayerErrorInfoDialog {

  constructor(public dialogRef: MatDialogRef<PlayerErrorInfoDialog>) {  
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}