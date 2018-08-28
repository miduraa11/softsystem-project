import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
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
  displayedColumns: string[] = ['id', 'login', 'email', 'firstName', 'lastName', 'delete'];
  dataSource: any;

  constructor(private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.filterPredicate = function customFilter(dataFilter , filter:string ): boolean {
        return (dataFilter.id === +filter ||                   
                dataFilter.login.trim().toLowerCase().indexOf(filter) != -1 ||
                dataFilter.email.trim().toLowerCase().indexOf(filter) != -1 ||
                dataFilter.firstName.trim().toLowerCase().indexOf(filter) != -1 ||
                dataFilter.lastName.trim().toLowerCase().indexOf(filter) != -1
              );}
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.dataSource = new MatTableDataSource(this.users);
      }
    });
  }

}
