import { Component, OnInit, Inject, Input } from '@angular/core';
import { DisciplineService } from '../../services/discipline.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../../model/type';
import { FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AdminDeleteObjectComponent } from '../admin-panel-delete-object.component';

export interface DialogData {
  type: Type;
  flag: number;
}

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineComponent implements OnInit {
  
  types: Type[];

  constructor(private disciplineService: DisciplineService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.disciplineService.getAll().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.log(error)
      }
    );
  }

  openDeleteObjectDialog(object: any, flag: number): void {
    const dialogRef = this.dialog.open(AdminDeleteObjectComponent, {
      width: '450px',
      data: { object, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUpdateDisciplineDialog(type: Type, flag: number): void {
    const dialogRef = this.dialog.open(UpdateDisciplineDialog, {
      width: '450px',
      data: { type, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'discipline-list-update',
  templateUrl: './discipline-list-update.html'
})
export class UpdateDisciplineDialog {

  type: Type;
  flag: number;

  updateForm = new FormGroup({
    discipline: new FormControl('', [
      Validators.required
    ]),
    individual: new FormControl('', [
      Validators.required
    ])
  });

  constructor( public dialogRef: MatDialogRef<UpdateDisciplineDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private disciplineService: DisciplineService,
    public snackBar: MatSnackBar
  ) {
    this.flag = this.data.flag;
    if(this.flag == 0) { this.type = new Type(); }
    else { this.type = this.data.type; }
  }
    
  ngOnInit(): void {
    if(this.flag == 1) {
      this.updateForm.get('discipline').setValue(this.type.discipline);
      this.updateForm.get('individual').setValue(String(this.type.individual));
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  updateDiscipline(): void {
    if(this.updateForm.valid) {
      this.type.discipline = this.updateForm.get('discipline').value;
      this.type.individual = this.updateForm.get('individual').value;
      switch(this.flag) {
        case 0: {
          this.disciplineService.addDiscipline(this.type).subscribe(
            data => {
              this.dialogRef.close();
              window.location.reload();
            },
            error => console.log(error)
          );
          break;
        }
        case 1: {
          this.disciplineService.editDiscipline(this.type).subscribe(
            data => {
              this.dialogRef.close();
              window.location.reload();
            },
            error => console.log(error)
          );  
          break;
        }
        default: {
          console.log("error");
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
