import { Component, OnInit, Inject, Input } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../model/team';
import { Type } from '../../model/type';
import { Validators, FormControl, FormGroup } from '../../../../node_modules/@angular/forms';
import { MyErrorStateMatcher } from '../edit-events/edit-events.component';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  id: number;
  name: string;
  type: Type;
  types: Array<Type>;
}

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  
  teams: Array<any>;
  types: Array<any>;

  constructor(private teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.teamService.getAll().subscribe(data =>{this.teams = data});
    this.teamService.getAllType().subscribe(data =>{this.types = data});
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(EditTeamsModalDelete, {
      width: '450px',
      data: {id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(EditTeamsModalAdd, {
      width: '450px',
      data: {name, types: this.types}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(id: number, name: string, type: Type): void {
    const dialogRef = this.dialog.open(EditTeamsModalEdit, {
      width: '450px',
      data: {name, id, type}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'edit-teams-modal-delete',
  templateUrl: './edit-teams-modal-delete.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalDelete {

  error: number;

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTeam() {
    this.teamService.deleteTeam(this.data.id).subscribe(
      data => {
        this.error = data;
        this.dialogRef.close();
        if(this.error == 0) { window.location.reload(); }
        else { this.openErrorInfoDialog(); }
      },
      error => {
        console.log(error);          
      }
    );        
  }

  openErrorInfoDialog(): void {
    const dialogRef = this.dialog.open(TeamErrorInfoDialog, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'edit-teams-modal-add',
  templateUrl: './edit-teams-modal-add.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalAdd {
  
  choosenTypeId: number;
  team: Team = new Team();
  types: Array<Type>;

  addForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) { }
    
  ngOnInit() {
    this.teamService.getAllType().subscribe(
      data => { this.types = data }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addTeam() {
    if(this.addForm.valid) {
      this.team.name = this.addForm.get('name').value; 
      this.team.type = this.addForm.get('discipline').value; 
      this.teamService.addTeam(this.team).subscribe(
        data => {
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

    //teamName
    teamNameFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherTeamName = new MyErrorStateMatcher();

     //discipline
     disciplineFormControl = new FormControl('', [
      Validators.required,
    ]);
    matcherDiscipline = new MyErrorStateMatcher();  

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.teamService.getAllType().subscribe(data =>{this.types = data});
    this.choosenTypeId = this.data.type.id;
    this.teamNameFormControl.setValue(this.data.name);
    this.disciplineFormControl.setValue(this.data.type.id)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editTeam() {
    if(this.teamNameFormControl.errors==null
    && this.disciplineFormControl.errors==null) {
    this.team.name= this.teamNameFormControl.value; 
    this.team.type = this.types.find(x => x.id == this.disciplineFormControl.value);
    this.team.id = this.data.id; 
    this.teamService.editTeam(this.team)
      .subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));
      }      
  }
}

@Component({
  selector: 'error-info-dialog',
  templateUrl: './error-info-dialog.html',
})
export class TeamErrorInfoDialog {

  constructor(public dialogRef: MatDialogRef<TeamErrorInfoDialog>) {  
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}