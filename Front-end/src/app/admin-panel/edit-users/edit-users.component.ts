import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { User } from '../../model/user';
import { AdminDeleteObjectComponent } from '../admin-panel-delete-object.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  user: User;
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

  openDeleteObjectDialog(object: any, flag: number): void {
    const dialogRef = this.dialog.open(AdminDeleteObjectComponent, {
      width: '450px',
      data: { object, flag }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.user = result;
        this.users = this.users.filter(x =>  x.id != this.user.id);
      }
    });
  }

}
