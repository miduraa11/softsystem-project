import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DisciplineService } from "../services/discipline.service";

export interface DeleteObjectData {
    object: any;
    flag: number;
}

@Component({
    selector: 'admin-panel-delete-object',
    templateUrl: './admin-panel-delete-object.component.html',
    styleUrls: ['./admin-panel-delete-object.component.css']
})
export class AdminDeleteObjectComponent {
    
    object: any;
    flag: number;
    error: number;

    constructor(public dialogRef: MatDialogRef<AdminDeleteObjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteObjectData,
        public dialog: MatDialog,        
        private disciplineService: DisciplineService
    ) { 
        this.object = this.data.object;
        this.flag = this.data.flag;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    deleteObject(): void {
        switch(this.flag) {
            case 1: {
                this.disciplineService.deleteDiscipline(this.object).subscribe(
                    data => {
                        this.error = data;
                        this.dialogRef.close();
                        if(this.error == 0) { window.location.reload(); }
                        else { this.openErrorInfoDialog(); }
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
    }

    openErrorInfoDialog(): void {
        const dialogRef = this.dialog.open(ErrorInfoDialog, {
        width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        });
    }

}

@Component({
    selector: 'error-info-dialog',
    templateUrl: './error-info-dialog.html',
})
export class ErrorInfoDialog {

    constructor(public dialogRef: MatDialogRef<ErrorInfoDialog>) {  
    }

    onOkClick(): void {
        this.dialogRef.close();
    }
  
}