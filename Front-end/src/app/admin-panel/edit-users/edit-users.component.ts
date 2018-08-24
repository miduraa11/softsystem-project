import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  users: Array<any>;

  constructor(private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(RemoveUserDialog, {
      width: '450px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'remove-user-dialog',
  templateUrl: './remove-user-dialog.html',
})
export class RemoveUserDialog {

  error: number;

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<RemoveUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) { }

  onAnulujClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.userService.deleteUser(this.data.id).subscribe(
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
    const dialogRef = this.dialog.open(UserErrorInfoDialog, {
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
export class UserErrorInfoDialog {

  constructor(public dialogRef: MatDialogRef<UserErrorInfoDialog>) {  
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}