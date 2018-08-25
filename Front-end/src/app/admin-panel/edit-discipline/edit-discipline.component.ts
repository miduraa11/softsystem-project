import { Component, OnInit, Inject, Input } from '@angular/core';
import { DisciplineService } from '../../services/discipline.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../../model/type';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '../../../../node_modules/@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogData {
  type: Type;
}
export interface DialogDataDelete {
  id: number;
}

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineComponent implements OnInit {
  
  disciplines: Array<any>;

  constructor(private disciplineService: DisciplineService, public dialog: MatDialog) { }


  ngOnInit() {
    this.disciplineService.getAll().subscribe(
      data =>{ this.disciplines = data }
    );
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(EditDisciplineModalDelete, {
      width: '450px',
      data: {id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(EditDisciplineModalAdd, {
      width: '450px',
      data: {}
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

  error: number;

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataDelete,
    public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDiscipline() {
    this.disciplineService.deleteDiscipline(this.data.id).subscribe(
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

  onNoClick(): void {
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