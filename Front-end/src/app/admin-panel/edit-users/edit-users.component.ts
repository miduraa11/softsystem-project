import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../model/user';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
       this.users = data;
      }
    );
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(RemoveUserDialog, {
      width: '450px',
      data: { user }
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

  user: User;
  error: number;

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<RemoveUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {
    this.user = this.data.user;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.userService.deleteUser(this.user).subscribe(
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