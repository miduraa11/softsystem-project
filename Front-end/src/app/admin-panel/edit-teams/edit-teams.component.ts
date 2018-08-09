import { Component, OnInit, Inject, Input } from '@angular/core';
import { TeamService } from '../team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
import { Team } from '../../model/team';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  
  id: number;
  teams: Array<any>;

  constructor(private teamService: TeamService, public dialog: MatDialog) { }


  ngOnInit() {
    this.teamService.getAll().subscribe(data =>{this.teams = data});
    }

  openDialogDelete(id: number): void {
      const dialogRef = this.dialog.open(EditTeamsModal, {
        width: '400px',
        data: {id: id}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  openDialogAdd(){
    console.log("dzialadodawanie");
    const dialogRef = this.dialog.open(EditTeamsModalAdd, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  }



@Component({
  selector: 'edit-teams-modal',
  templateUrl: './edit-teams-modal.html',
})
export class EditTeamsModal {

  @Input() team: Team;

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTeam() {
    this.teamService.deleteTeam(this.data.id)
      .subscribe(
        data => {
          console.log(data);
          this.dialogRef.close();
        },
        error => console.log(error));
        window.location.reload();
  }

}


@Component({
  selector: 'edit-teams-modal-add',
  templateUrl: './edit-teams-modal-add.html',
})
export class EditTeamsModalAdd {

  @Input() team: Team;

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  AddTeam() {
    this.teamService.AddTeam(this.data)
      .subscribe(
        data => {
          console.log(data);
          this.dialogRef.close();
        },
        error => console.log(error));
        window.location.reload();
  }
  */
}
