import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage';
import { Router } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';
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

  userLogin: String;
  userPassword: String;
  key: string = "User id";
  id: any;
  userId: any;

  constructor(private localStorageService: LocalStorageService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

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

  openSnackBar() {
    this.snackBar.open('Niepoprawny login lub hasło !', 'Zamknij', {
      duration: 3000
    });
  }

  login(){
    this.localStorageService.getUser(this.userLogin, this.userPassword).subscribe(data => { console.log(data);
    this.id = data;
    localStorage.setItem(this.key, this.id);
    this.userId = localStorage.getItem(this.key);

    if(this.userId != ""){
      this.router.navigate(['/home']);
    } else{
      this.openSnackBar();
    }
    });

    
    }

}


