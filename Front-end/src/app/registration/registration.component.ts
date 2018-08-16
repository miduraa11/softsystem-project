import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { RegistrationService } from './registration.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl} from '@angular/forms';

//// Validation email, firstName, lastName
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
//// Validation password
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
     let password = AC.get('password').value; // to get value in input tag
     let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if(password != confirmPassword) {
          console.log('false');
          AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
          console.log('true');
          return null
      }
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  user: User = { id: 0, firstName: "", lastName: "", email: "", password: ""};
  correctEmail: boolean =false;
  dane: any;
  password: string = "";

//Email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcherEmail = new MyErrorStateMatcher();

//firstName
firstNameFormControl = new FormControl('', [
  Validators.required,
  //Validators.minLength(3),
  Validators.pattern('^[a-zA-Z-]{3,30}$'),
]);
matcherFirstName = new MyErrorStateMatcher();

//lastName
lastNameFormControl = new FormControl('', [
  Validators.required,
  //Validators.minLength(3),
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


  addUser(){
    //console.log(this.emailFormControl.value)
    if(this.emailFormControl.errors==null && this.firstNameFormControl.errors==null && this.lastNameFormControl.errors==null && this.passwordFormControl.errors==null && this.confirmPasswordFormControl.errors==null){
      this.user.email=this.emailFormControl.value;
      this.user.firstName=this.firstNameFormControl.value;
      this.user.lastName=this.lastNameFormControl.value;
      this.user.password=this.passwordFormControl.value;
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
