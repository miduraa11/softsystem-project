import { Component, OnInit, Inject, Input } from '@angular/core';
import { TeamService } from '../team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
import { Team } from '../../model/team';

export interface DialogData {
  id: number;
  name: string;
}
//list teams

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  
  id: number;
  teams: Array<any>;
  name: string;

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

  openDialogAdd(): void{
    const dialogRef = this.dialog.open(EditTeamsModalAdd, {
      width: '800px',
      height: '350px',
      data: {name: this.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name =result;
    });
  }

  openDialogEdit(id: number): void{
    console.log("dzialadodawanie");
    console.log(id);
    const dialogRef = this.dialog.open(EditTeamsModalEdit, {
      width: '800px',
      height: '350px',
      data: {name: this.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name =result;
    });
  }



  }


//Delete Team

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

//Add team

@Component({
  selector: 'edit-teams-modal-add',
  templateUrl: './edit-teams-modal-add.html',
})
export class EditTeamsModalAdd {

  name: string;
  team: Team = { id : 0, name : ""};
  

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addTeam(name: string) {
    this.team.name= name; 
    this.teamService.addTeam(this.team.name)
      .subscribe(
        data => {
          this.dialogRef.close();
        },
        error => console.log(error));
        window.location.reload();
      
  }
}

//Edit team

@Component({
  selector: 'edit-teams-modal-edit',
  templateUrl: './edit-teams-modal-edit.html',
})
export class EditTeamsModalEdit {

  name: string;
  id: number;
  team: Team = { id : 0, name : ""};
  

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editTeam(name: string) {
    this.team.name= name; 
    this.teamService.addTeam(this.team.name)
      .subscribe(
        data => {
          this.dialogRef.close();
        },
        error => console.log(error));
        window.location.reload();
      
  }
}
