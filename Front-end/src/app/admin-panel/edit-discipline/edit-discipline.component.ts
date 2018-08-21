import { Component, OnInit, Inject, Input } from '@angular/core';
import { DisciplineService } from '../../services/discipline.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../../model/type';

export interface DialogData {
  id: number;
  discipline: string;
  individual: boolean;
}


//list discipline

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineComponent implements OnInit {
  
  disciplines: Array<any>;

  constructor(private disciplineService: DisciplineService, public dialog: MatDialog) { }


  ngOnInit() {
    this.disciplineService.getAll().subscribe(data =>{this.disciplines = data});
    }

  openDialogDelete(id: number): void {
      const dialogRef = this.dialog.open(EditDisciplineModalDelete, {
        width: '400px',
        data: {id}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  openDialogAdd(): void{
    const dialogRef = this.dialog.open(EditDisciplineModalAdd, {
      width: '550px',
      height: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(id: number, discipline: string, individual: boolean): void{
    const dialogRef = this.dialog.open(EditDisciplineModalEdit, {
      width: '550px',
      height: '350px',
      data: {discipline, id, individual}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


//Delete discipline

@Component({
  selector: 'edit-discipline-modal-delete',
  templateUrl: './edit-discipline-modal-delete.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineModalDelete {

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDiscipline() {
    this.disciplineService.deleteDiscipline(this.data.id)
      .subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));
  }

}

//Add discipline

@Component({
  selector: 'edit-discipline-modal-add',
  templateUrl: './edit-discipline-modal-add.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineModalAdd {

  discipline: Type = { id : 0, discipline : "", individual: false};

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addDiscipline() {
    //this.discipline.discipline= this.data.discipline; 
    //this.discipline.individual = this.data.individual; 
    this.disciplineService.addDiscipline(this.discipline)
      .subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));
      
  }
}

//Edit discipline

@Component({
  selector: 'edit-discipline-modal-edit',
  templateUrl: './edit-discipline-modal-edit.html',
  styleUrls: ['./edit-discipline.component.css']
})
export class EditDisciplineModalEdit {

  discipline: Type = { id : 0, discipline : "", individual: null};

  constructor(private disciplineService: DisciplineService,
    public dialogRef: MatDialogRef<EditDisciplineModalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  editDiscipline() {
    this.discipline.discipline = this.data.discipline;
    this.discipline.id = this.data.id; 
    this.discipline.individual = this.data.individual;
    this.disciplineService.editDiscipline(this.discipline)
      .subscribe(
        data => {
          this.dialogRef.close();
          window.location.reload();
        },
        error => console.log(error));      
  }
}
