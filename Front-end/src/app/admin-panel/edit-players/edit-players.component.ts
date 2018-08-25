import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PlayerService } from '../../services/player.service';
import { TypeService } from '../../services/type.service';
import { Validators, FormControl, FormGroup } from '../../../../node_modules/@angular/forms';
import { Member } from '../../model/member';
import { Type } from '../../model/type';

export interface DialogData {
  player: Member;
}

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.css']
})
export class EditPlayersComponent implements OnInit {  

  players: Member[];

  constructor(private playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(
      data => {
        this.players = data
      },
      error => console.log(error)
    );    
  }

  openDeleteDialog(player: Member): void {
    const dialogRef = this.dialog.open(RemovePlayerDialog, {
      width: '450px',
      data: { player }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(player: Member): void {
    const dialogRef = this.dialog.open(PlayerEditDialog, {
      width: '450px',
      data: { player }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialog, {
      width: '450px'
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

  player: Member;
  error: number;

  constructor(private playerService: PlayerService,
    public dialogRef: MatDialogRef<RemovePlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {
    this.player = this.data.player;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.playerService.deletePlayer(this.player).subscribe(
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

  player: Member;
  chosenType: number;
  types: Type[];

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) {
    this.player = this.data.player;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.typeService.getTypes().subscribe(
      data => {
        this.types = data;
      }
    );
    this.editForm.get('name').setValue(this.player.name);
    this.editForm.get('discipline').setValue(this.player.type.id);
  }

  onSaveClick(): void {
    if(this.editForm.valid) {
      this.player.name = this.editForm.get('name').value;
      this.chosenType = this.editForm.get('discipline').value;
      this.player.type = this.types.find(x => this.chosenType == x.id);
      this.playerService.updatePlayer(this.player).subscribe(
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

  player: Member;
  types: Type[];

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) {
    this.player = new Member();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.typeService.getTypes().subscribe(
      data =>{
        this.types = data;
      },
      error => console.log(error)
    );
  }

  onAddClick(): void {
    if(this.addForm.valid) {
      this.player.name = this.addForm.get('name').value;
      this.player.type = this.addForm.get('discipline').value;
      this.playerService.addPlayer(this.player).subscribe(
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