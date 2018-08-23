import { Component, OnInit, Inject, Input } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../model/team';
import { Type } from '../../model/type';

export interface DialogData {
  id: number;
  name: string;
  type: Type;
  types: Array<Type>;
}


//list teams

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  
  //id: number;
  teams: Array<any>;
  types: Array<any>;
  //name: string;

  constructor(private teamService: TeamService, public dialog: MatDialog) { }


  ngOnInit() {
    this.teamService.getAll().subscribe(data =>{this.teams = data});
    this.teamService.getAllType().subscribe(data =>{this.types = data});
    }

  openDialogDelete(id: number): void {
      const dialogRef = this.dialog.open(EditTeamsModalDelete, {
        width: '400px',
        data: {id}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  openDialogAdd(): void{
    const dialogRef = this.dialog.open(EditTeamsModalAdd, {
      width: '550px',
      height: '350px',
      data: {name, types: this.types}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(id: number, name: string, type: Type): void{
    const dialogRef = this.dialog.open(EditTeamsModalEdit, {
      width: '550px',
      height: '350px',
      data: {name, id, type}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  }


//Delete Team

@Component({
  selector: 'edit-teams-modal-delete',
  templateUrl: './edit-teams-modal-delete.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalDelete {

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
          this.dialogRef.close();
          window.location.reload();
        },
        error => {
          console.log(error);          
        }
      );
        
  }

}

//Add team

@Component({
  selector: 'edit-teams-modal-add',
  templateUrl: './edit-teams-modal-add.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalAdd {
  choosenTypeId: number;
  team: Team = { id : 0, name : "", type: null};
  types: Array<Type>;
  

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
  ngOnInit() {
    this.teamService.getAllType().subscribe(data =>{this.types = data});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addTeam() {
    this.team.name= this.data.name; 
    this.team.type = this.types.find(x => x.id == this.choosenTypeId); 
    this.teamService.addTeam(this.team)
      .subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));
      
  }
}

//Edit team

@Component({
  selector: 'edit-teams-modal-edit',
  templateUrl: './edit-teams-modal-edit.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalEdit {
  choosenTypeId: number;
  types: Array<Type>;
  team: Team = { id : 0, name : "", type: null};

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.teamService.getAllType().subscribe(data =>{this.types = data});
    this.choosenTypeId = this.data.type.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editTeam() {
    this.team.name = this.data.name;
    this.team.id = this.data.id; 
    this.team.type = this.types.find(x => x.id == this.choosenTypeId);
    this.teamService.editTeam(this.team)
      .subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));      
  }
}
