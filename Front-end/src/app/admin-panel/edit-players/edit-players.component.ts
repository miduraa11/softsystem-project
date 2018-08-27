import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PlayerService } from '../../services/player.service';
import { TypeService } from '../../services/type.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../model/member';
import { Type } from '../../model/type';
import { AdminDeleteObjectComponent } from '../admin-panel-delete-object.component';
import {MatTableDataSource} from '@angular/material';

export interface DialogData {
  player: Member;
  flag: number;
}

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.component.html',
  styleUrls: ['./edit-players.component.css']
})
export class EditPlayersComponent implements OnInit {  

  player: Member;
  players: Member[];
  displayedColumns: string[] = ['id', 'name', 'discipline', 'edit', 'delete'];
  dataSource: any;

  constructor(private playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
      this.dataSource = new MatTableDataSource(this.players);
    });    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteObjectDialog(object: any, flag: number): void {
    const dialogRef = this.dialog.open(AdminDeleteObjectComponent, {
      width: '450px',
      data: { object, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.player = result;
        this.players = this.players.filter(x =>  x.id != this.player.id);
        this.dataSource = new MatTableDataSource(this.players);
      }
    });
  }

  openUpdatePlayerDialog(player: Member, flag: number): void {
    const dialogRef = this.dialog.open(UpdatePlayerDialog, {
      width: '450px',
      data: { player, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.player = result;
        var index = this.players.findIndex(x => x.id == this.player.id)
        if( index == -1) { this.players.push(this.player); }
        else { this.players[index] = this.player; }
        this.dataSource = new MatTableDataSource(this.players);
      }
    });
  }

}

@Component({
  selector: 'player-list-update',
  templateUrl: './player-list-update.html',
})
export class UpdatePlayerDialog implements OnInit {

  player: Member;
  chosenType: number;
  types: Type[];
  flag: number;

  updateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ])
  });

  constructor(public dialogRef: MatDialogRef<UpdatePlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private typeService: TypeService,
    private playerService: PlayerService,
    public snackBar: MatSnackBar
  ) {
    this.flag = this.data.flag;
    if(this.flag == 0) { this.player = new Member(); }
    else { this.player = this.data.player; }
  }

  ngOnInit(): void {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
    });
    if(this.flag == 1) {
      this.updateForm.get('name').setValue(this.player.name);
      this.updateForm.get('discipline').setValue(this.player.type.id);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if(this.updateForm.valid) {
      this.player.name = this.updateForm.get('name').value;
      switch(this.flag) {
        case 0: {
          this.player.type = this.updateForm.get('discipline').value;
          this.playerService.addPlayer(this.player).subscribe(data => {
            this.player.id = data;
            this.dialogRef.close(this.player);
          });
          break;
        }
        case 1: {
          this.chosenType = this.updateForm.get('discipline').value;
          this.player.type = this.types.find(x => this.chosenType == x.id);
          this.playerService.updatePlayer(this.player).subscribe(data => { 
            this.dialogRef.close(this.player);
          });
          break;
        }
      }
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
