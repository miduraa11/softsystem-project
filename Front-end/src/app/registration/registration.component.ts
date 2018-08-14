import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { RegistrationService } from './registration.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

///////////
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
//////////


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  repeatPassword: String;
  user: User = { id: 0, firstName: "", lastName: "", email: "", password: ""};
  correctEmail: boolean =false;
  dane: any;

//Email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcherEmail = new MyErrorStateMatcher();

//firstName
firstNameFormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(3),
]);
matcherFirstName = new MyErrorStateMatcher();

//lastName
lastNameFormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(3),
]);
matcherLastName = new MyErrorStateMatcher();
//



  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  addUser(){
    //console.log(this.emailFormControl.value)
    if(this.emailFormControl.errors==null && this.firstNameFormControl.errors==null && this.lastNameFormControl.errors==null){
      this.user.email=this.emailFormControl.value;
      this.user.firstName=this.firstNameFormControl.value;
      this.user.lastName=this.lastNameFormControl.value;
      this.registrationService.addUser(this.user).subscribe(
        data => {
          window.location.reload();
        },
        error => console.log(error));
        window.location.reload();}
    else{
      alert("Błędnie wprowadzone dane!");
    }
        
  }

}
