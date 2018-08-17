import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Md5} from 'ts-md5/dist/md5';


//Validation 
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //login
  loginFormControl = new FormControl('', [
    Validators.required,
    //Validators.pattern('^[a-zA-Z0-9_-]{3,30}$'),
  ]);
  matcherLogin = new MyErrorStateMatcher();

  //password
  passwordFormControl = new FormControl('', [
    Validators.required,
    //Validators.minLength(8),
    //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
  ]);
  matcherPassword = new MyErrorStateMatcher();



  constructor(private loginService: LoginService) { 
  }

  ngOnInit() {
  }

  onLogin(){
    if(this.passwordFormControl.errors==null && this.loginFormControl.errors==null){
      this.login();
      alert("Zalogowałeś się!");
    }
  }

  login() {
    
  }

}
