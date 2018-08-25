import { Component, OnInit, Inject, Input } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '../../model/member';
import { Type } from '../../model/type';
import { Validators, FormControl, FormGroup } from '../../../../node_modules/@angular/forms';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  team: Member;
}

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  
  teams: Member[];

  constructor(private teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.teamService.getAll().subscribe(
      data => {
        this.teams = data;
      },
      error => console.log(error)
    );
  }

  openDialogDelete(team: Member): void {
    const dialogRef = this.dialog.open(EditTeamsModalDelete, {
      width: '450px',
      data: { team }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed');
      }
    );
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(EditTeamsModalAdd, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed');
      }
    );
  }

  openDialogEdit(team: Member): void {
    const dialogRef = this.dialog.open(EditTeamsModalEdit, {
      width: '450px',
      data: { team }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed');
      }
    );
  }

}

@Component({
  selector: 'edit-teams-modal-delete',
  templateUrl: './edit-teams-modal-delete.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalDelete {

  team: Member;
  error: number;

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {
    this.team = this.data.team;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  deleteTeam() {
    this.teamService.deleteTeam(this.team).subscribe(
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
  
  team: Member;
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
    public snackBar: MatSnackBar
  ) {
    this.team = new Member();
  }
    
  ngOnInit(): void {
    this.teamService.getAllType().subscribe(
      data => {
        this.types = data
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  addTeam(): void {
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

@Component({
  selector: 'edit-teams-modal-edit',
  templateUrl: './edit-teams-modal-edit.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsModalEdit {

  types: Type[];
  team: Member;
  chosenType: number;

  editForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamsModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) {
    this.team = this.data.team;
  }

  ngOnInit(): void {
    this.teamService.getAllType().subscribe(
      data => {
        this.types = data
      }
    );
    this.editForm.get('name').setValue(this.team.name);
    this.editForm.get('discipline').setValue(this.team.type.id);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  editTeam() {
    if(this.editForm.valid) {
      this.team.name= this.editForm.get('name').value;
      this.chosenType = this.editForm.get('discipline').value;
      this.team.type = this.types.find(x => this.chosenType == x.id);
      this.teamService.editTeam(this.team).subscribe(
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