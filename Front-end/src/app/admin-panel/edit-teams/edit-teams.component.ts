import { Component, OnInit, Inject } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '../../model/member';
import { Type } from '../../model/type';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AdminDeleteObjectComponent } from '../admin-panel-delete-object.component';

export interface DialogData {
  team: Member;
  flag: number;
}

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {
  
  team: Member;
  teams: Member[];
  displayedColumns: string[] = ['id', 'name', 'discipline', 'edit', 'delete'];
  dataSource: any;

  constructor(private teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.teamService.getAll().subscribe(data => {
      this.teams = data;
      this.dataSource = new MatTableDataSource(this.teams);
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
        this.team = result;
        this.teams = this.teams.filter(x =>  x.id != this.team.id);
        this.dataSource = new MatTableDataSource(this.teams);
      }
    });
  }

  openUpdateTeamDialog(team: Member, flag: number): void {
    const dialogRef = this.dialog.open(UpdateTeamDialog, {
      width: '450px',
      data: { team, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.team = result;
        var index = this.teams.findIndex(x => x.id == this.team.id)
        if( index == -1) { this.teams.push(this.team); }
        else { this.teams[index] = this.team; }
        this.dataSource = new MatTableDataSource(this.teams);
      }
    });
  }

}

@Component({
  selector: 'team-list-update',
  templateUrl: './team-list-update.html'
})
export class UpdateTeamDialog {
  
  team: Member;
  types: Type[];
  chosenType: number;
  flag: number;

  updateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    discipline: new FormControl('', [
      Validators.required
    ])
  });

  constructor(public dialogRef: MatDialogRef<UpdateTeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private teamService: TeamService,
    public snackBar: MatSnackBar
  ) {
    this.flag = this.data.flag;
    if(this.flag == 0) { this.team = new Member(); }
    else { this.team = this.data.team; }
  }
    
  ngOnInit(): void {
    this.teamService.getAllType().subscribe(data => {
      this.types = data
    });
    if(this.flag == 1) {
      this.updateForm.get('name').setValue(this.team.name);
      this.updateForm.get('discipline').setValue(this.team.type.id);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  
  updateTeam(): void {
    if(this.updateForm.valid) {
      this.team.name= this.updateForm.get('name').value;
      switch(this.flag) {
        case 0: {
          this.team.type = this.updateForm.get('discipline').value;
          this.teamService.addTeam(this.team).subscribe(data => {
            this.team.id = data;
            this.dialogRef.close(this.team);
          });
          break;
        }
        case 1: {
          this.chosenType = this.updateForm.get('discipline').value;
          this.team.type = this.types.find(x => this.chosenType == x.id);
          this.teamService.editTeam(this.team).subscribe(data => {
            this.dialogRef.close(this.team);
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
