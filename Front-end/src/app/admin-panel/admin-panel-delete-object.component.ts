import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DisciplineService } from "../services/discipline.service";
import { EventService } from "../services/event.service";
import { PlayerService } from "../services/player.service";
import { TeamService } from "../services/team.service";
import { UserService } from "../services/user.service";

export interface DeleteObjectData {
    object: any;
    flag: number;
}

export interface ErrorDialogData {
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
        private disciplineService: DisciplineService,
        private eventService: EventService,
        private playerService: PlayerService,
        private teamService: TeamService,
        private userService: UserService
    ) { 
        this.object = this.data.object;
        this.flag = this.data.flag;
    }

    onCancelClick(): void {
        this.dialogRef.close(null);
    }

    deleteObject(): void {
        switch(this.flag) {
            case 1: {
                this.disciplineService.deleteDiscipline(this.object).subscribe(
                    data => {
                        this.error = data;
                        if(this.error == -1) {
                            this.openErrorInfoDialog(this.flag);
                            this.dialogRef.close(null);
                        }
                        else { this.dialogRef.close(this.object); }
                    },
                    error => console.log(error)
                );
                break;
            }
            case 2: {
                this.eventService.deleteEvent(this.object).subscribe(
                    data => {
                        this.error = data;
                        if(this.error == -1) {
                            this.openErrorInfoDialog(this.flag);
                            this.dialogRef.close(null);
                        }
                        else { this.dialogRef.close(this.object); }
                    },
                    error => console.log(error)
                );
                break;
            }
            case 3: {
                this.playerService.deletePlayer(this.object).subscribe(
                    data => {
                        this.error = data;
                        if(this.error == -1) {
                            this.openErrorInfoDialog(this.flag);
                            this.dialogRef.close(null);
                        }
                        else { this.dialogRef.close(this.object); }
                    },
                    error => console.log(error)
                );
                break;
            }
            case 4: {
                this.teamService.deleteTeam(this.object).subscribe(
                    data => {
                        this.error = data;
                        if(this.error == -1) {
                            this.openErrorInfoDialog(this.flag);
                            this.dialogRef.close(null);
                        }
                        else { this.dialogRef.close(this.object); }
                    },
                    error => {
                      console.log(error);          
                    }
                );
                break;
            }
            case 5: {
                this.userService.deleteUser(this.object).subscribe(
                    data => {
                        this.error = data;
                        if(this.error == -1) {
                            this.openErrorInfoDialog(this.flag);
                            this.dialogRef.close(null);
                        }
                        else { this.dialogRef.close(this.object); }
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

    openErrorInfoDialog(flag: number): void {
        const dialogRef = this.dialog.open(ErrorInfoDialog, {
        width: '400px',
        data: { flag }
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

    flag: number;

    constructor(public dialogRef: MatDialogRef<ErrorInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
    ) {
        this.flag = this.data.flag;
    }

    onOkClick(): void {
        this.dialogRef.close();
    }
  
}