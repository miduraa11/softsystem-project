import { Component, OnInit, Inject, Input } from '@angular/core';
import { TeamService } from '../team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
import { Team } from '../../model/team';
import { Type } from '../../model/type';

export interface DialogData {
  id: number;
  name: string;
  pName: string;
  type: Type;
}

export interface Food {
  value: string;
  viewValue: string;
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
  types: Array<any>;
  name: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  constructor(private teamService: TeamService, public dialog: MatDialog) { }


  ngOnInit() {
    this.teamService.getAll().subscribe(data =>{this.teams = data});
    this.teamService.getAllType().subscribe(data =>{this.types = data});
    }

  openDialogDelete(id: number): void {
      const dialogRef = this.dialog.open(EditTeamsModalDelete, {
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

  openDialogEdit(id: number, pName: string): void{
    const dialogRef = this.dialog.open(EditTeamsModalEdit, {
      width: '800px',
      height: '350px',
      data: {name: this.name, pName, id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name =result;
    });
  }



  }


//Delete Team

@Component({
  selector: 'edit-teams-modal-delete',
  templateUrl: './edit-teams-modal-delete.html',
})
export class EditTeamsModalDelete {

  @Input() team: Team;

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalDelete>,
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
  team: Team = { id : 0, name : "", type: null};
  

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
  team: Team = { id : 0, name : "", type: null};
  

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.data.name = this.data.pName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editTeam(name: string, id: number) {
    this.team.name = name;
    this.team.id = id; 
    this.teamService.editTeam(this.team.name, this.team.id)
      .subscribe(
        data => {
          this.dialogRef.close();
        },
        error => console.log(error));
        window.location.reload();
      
  }
}
