import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserPanelService } from '../services/user-panel.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Md5} from 'ts-md5';
import { AppComponent } from '../app.component';
import { Router } from '../../../node_modules/@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {


  //current password
  currentPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);
  matcherCurrentPassword = new MyErrorStateMatcher();
  //password
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
  ]);
  matcherPassword = new MyErrorStateMatcher();
  //confirm password
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherConfirmPassword = new MyErrorStateMatcher();

  user: User = {id: 0, login: "", firstName: "", lastName: "", email: "", password: ""};
  key: string = "User id";
  currentUser: number;
  currentPassword: any;
  password: any;

  constructor(private userPanelService: UserPanelService, private logout: AppComponent, private router: Router) { }
  panelOpenState = false;
  ngOnInit() {
    this.currentUser = Number(localStorage.getItem(this.key));
    this.userPanelService.getUserById(this.currentUser).subscribe(data => {
        this.user = data;
      });
  }

  save(){
    this.currentPassword = Md5.hashStr(this.currentPasswordFormControl.value);
    this.password = Md5.hashStr(this.passwordFormControl.value);
    if(this.currentPasswordFormControl.errors==null && this.passwordFormControl.errors==null && this.confirmPasswordFormControl.errors==null)
      this.userPanelService.changePassword(this.user.id, this.currentPassword, this.password).subscribe(data => {
        if(data){
          alert("Brawo, hasło zostało zmienione!\nZaloguj się ponownie przy użyciu nowego hasła.");
          this.logout.logout();
          this.router.navigate(['/login']);
        }
        else {
          alert("Podałeś błędne dane!");
        }
      });
  }

}
