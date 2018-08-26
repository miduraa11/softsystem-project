import { Component, OnInit, Inject } from '@angular/core';
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
  
  type: Type;
  types: Type[];

  constructor(private disciplineService: DisciplineService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.disciplineService.getAll().subscribe(data => {
      this.types = data
    });
  }

  openDeleteObjectDialog(object: any, flag: number): void {
    const dialogRef = this.dialog.open(AdminDeleteObjectComponent, {
      width: '450px',
      data: { object, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.type = result;
        this.types = this.types.filter(x =>  x.id != this.type.id);
      }
    });
  }

  openUpdateDisciplineDialog(type: Type, flag: number): void {
    const dialogRef = this.dialog.open(UpdateDisciplineDialog, {
      width: '450px',
      data: { type, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.type = result;
        var index = this.types.findIndex(x => x.id == this.type.id)
        if( index == -1) { this.types.push(this.type); }
        else { this.types[index] = this.type; }
      }
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
    this.dialogRef.close(null);
  }
  
  updateDiscipline(): void {
    if(this.updateForm.valid) {
      this.type.discipline = this.updateForm.get('discipline').value;
      if(this.updateForm.get('individual').value == "true") { this.type.individual = true; }
      else { this.type.individual = false; }
      switch(this.flag) {
        case 0: {
          this.disciplineService.addDiscipline(this.type).subscribe(data => {
            this.type.id = data;
            this.dialogRef.close(this.type);
          });
          break;
        }
        case 1: {
          this.disciplineService.editDiscipline(this.type).subscribe(data => {
            this.dialogRef.close(this.type);
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
