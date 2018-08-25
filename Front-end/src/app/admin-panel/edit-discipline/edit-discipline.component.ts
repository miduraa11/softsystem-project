import { Component, OnInit, Inject, Input } from '@angular/core';
import { DisciplineService } from '../../services/discipline.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../../model/type';
import { FormControl, Validators, FormGroup } from '../../../../node_modules/@angular/forms';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  type: Type;
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

  openDialogDelete(type: Type): void {
    const dialogRef = this.dialog.open(EditDisciplineModalDelete, {
      width: '450px',
      data: { type }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(EditDisciplineModalAdd, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(type: Type): void {
    const dialogRef = this.dialog.open(EditDisciplineModalEdit, {
      width: '450px',
      data: {type: type}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'edit-discipline-modal-delete',
  templateUrl: './edit-discipline-modal-delete.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineModalDelete {

  type: Type;
  error: number;

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) { 
    this.type = this.data.type;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  deleteDiscipline() {
    this.disciplineService.deleteDiscipline(this.type.id).subscribe(
      data => {
        this.error = data;
        this.dialogRef.close();
        if(this.error == 0) { window.location.reload(); }
        else { this.openErrorInfoDialog(); }
      },
      error => console.log(error)
    );
  }

  openErrorInfoDialog(): void {
    const dialogRef = this.dialog.open(DisciplineErrorInfoDialog, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'edit-discipline-modal-add',
  templateUrl: './edit-discipline-modal-add.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineModalAdd {

  type: Type = new Type();

  addForm = new FormGroup({
    discipline: new FormControl('', [
      Validators.required
    ]),
    individual: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) { }
    
  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  addDiscipline() {
    if(this.addForm.valid) {
      this.type.discipline = this.addForm.get('discipline').value;
      this.type.individual = this.addForm.get('individual').value;
      this.disciplineService.addDiscipline(this.type).subscribe(
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
  selector: 'edit-discipline-modal-edit',
  templateUrl: './edit-discipline-modal-edit.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineModalEdit {

  type: Type;

  editForm = new FormGroup({
    discipline: new FormControl('', [
      Validators.required
    ]),
    individual: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public snackBar: MatSnackBar
  ) { 
    this.type = this.data.type;
  }

  ngOnInit() {
    this.editForm.get('discipline').setValue(this.type.discipline);
    this.editForm.get('individual').setValue(String(this.type.individual));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editDiscipline() {
    if(this.editForm.valid) {
      this.type.discipline = this.editForm.get('discipline').value;
      this.type.individual = this.editForm.get('individual').value;
      this.disciplineService.editDiscipline(this.type).subscribe(
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
export class DisciplineErrorInfoDialog {

  constructor(public dialogRef: MatDialogRef<DisciplineErrorInfoDialog>) {  
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}