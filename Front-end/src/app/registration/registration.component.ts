import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { RegistrationService } from './registration.service';
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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  user: User = { id: 0, login: "", firstName: "", lastName: "", email: "", password: ""};
  existLogin: boolean;// = false;
  dane: any;
  password: string = "";

//email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcherEmail = new MyErrorStateMatcher();
//firstName
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z-]{3,30}$'),
  ]);
  matcherFirstName = new MyErrorStateMatcher();

//login
  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_-]{3,30}$'),
  ]);
  matcherLogin = new MyErrorStateMatcher();

//lastName
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z-]{3,50}$'),
  ]);
  matcherLastName = new MyErrorStateMatcher();
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

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  loginExist(){
    //this.registrationService.postLoginExist(this.loginFormControl.value);
    this.registrationService.getLoginExist(this.loginFormControl.value).subscribe(data =>{this.existLogin = data});
    if(!this.existLogin)
      this.addUser();
    else
      alert("Podany login już istnieje!");
  }


  addUser(){
    if(this.emailFormControl.errors==null && this.firstNameFormControl.errors==null && this.lastNameFormControl.errors==null && this.passwordFormControl.errors==null && this.confirmPasswordFormControl.errors==null && this.loginFormControl.errors==null){
      this.user.email=this.emailFormControl.value;
      this.user.firstName=this.firstNameFormControl.value;
      this.user.lastName=this.lastNameFormControl.value;
      this.user.login=this.loginFormControl.value;
      this.user.password= Md5.hashStr(this.passwordFormControl.value);
      this.registrationService.addUser(this.user).subscribe(
        data => {
          window.location.reload();
        },
      error => console.log(error));
      alert("Rejestracja zakończona pomyślnie! \nWitaj "+ this.user.firstName + " w BTB.");
      window.location.reload();}
    else{
      alert("Błędnie wprowadzone dane!");
    }
        
  }

}
