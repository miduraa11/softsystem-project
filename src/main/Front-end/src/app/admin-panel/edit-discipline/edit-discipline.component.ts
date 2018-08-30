import { Component, OnInit, Inject } from '@angular/core';
import { DisciplineService } from '../../services/discipline.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../../model/type';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AdminDeleteObjectComponent } from '../admin-panel-delete-object.component';
import {MatTableDataSource} from '@angular/material';

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
  displayedColumns: string[] = ['id', 'discipline', 'individual', 'result', 'draw', 'edit', 'delete'];
  dataSource: any;
  individual: String;
  result: String;
  draw: String;

  constructor(private disciplineService: DisciplineService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.disciplineService.getAll().subscribe(data => {
      this.types = data;
      this.dataSource = new MatTableDataSource(this.types);
      this.dataSource.filterPredicate = function customFilter(dataFilter , filter:string ): boolean {
        if(dataFilter.individual) { this.individual ="Indywidualna"; }
        else { this.individual ="Drużynowa"; }
        if(dataFilter.result) { this.result = "Szczegółowy"; }
        else { this.result = "Ogólny"; }
        if(dataFilter.draw) { this.draw = "Tak"; }
        else { this.darw = "Nie"; }
        return (dataFilter.id == filter ||                   
                dataFilter.discipline.trim().toLowerCase().indexOf(filter) != -1 ||
                this.individual.trim().toLowerCase().indexOf(filter) != -1 ||
                this.result.trim().toLowerCase().indexOf(filter) != -1 ||
                this.draw.trim().toLowerCase().indexOf(filter) != -1
              );
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.dataSource = new MatTableDataSource(this.types);
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
        this.dataSource = new MatTableDataSource(this.types);
      }
    });
  }

}

@Component({
  selector: 'discipline-list-update',
  templateUrl: './discipline-list-update.html',
  styleUrls: ['./discipline-list-update.css']
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
    ]),
    result: new FormControl('', [
      Validators.required
    ]),
    draw: new FormControl('', [
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
      this.updateForm.get('result').setValue(String(this.type.result));
      this.updateForm.get('draw').setValue(String(this.type.draw));
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
      if(this.updateForm.get('result').value == "true") { this.type.result = true; }
      else { this.type.result = false; }
      if(this.updateForm.get('draw').value == "true") { this.type.draw = true; }
      else { this.type.draw = false; }
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
