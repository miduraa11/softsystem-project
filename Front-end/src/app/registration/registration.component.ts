import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { RegistrationService } from '../services/registration.service';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Md5} from 'ts-md5';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  user: User = new User();
  existLogin: any = false;

  registrationForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z-śćżąęółńźŹŚĆŻĄĘÓŁŃ]{3,30}$')
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_-]{3,30}$')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z-śćżąęółńźŹŚĆŻĄĘÓŁŃ]{3,50}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
    ]),
    confirmPassword: new FormControl('', [
      Validators.required   
    ])
  });

  constructor(private registrationService: RegistrationService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  loginExist(){
    this.registrationService.getLoginExist(this.registrationForm.get('login').value).subscribe(
      data => {
        this.existLogin = data
        if(!this.existLogin) { this.addUser(); }
        else { alert("Podany login już istnieje!\nProszę podać inny lub zalogować się na istniejące konto."); }
      }
    );
  }

  addUser(){
    if(this.registrationForm.valid) {
      this.user.email = this.registrationForm.get('email').value;
      this.user.firstName = this.registrationForm.get('firstName').value;
      this.user.lastName = this.registrationForm.get('lastName').value;
      this.user.login = this.registrationForm.get('login').value;
      this.user.password = Md5.hashStr(this.registrationForm.get('password').value);
      this.registrationService.addUser(this.user).subscribe(
        error => console.log(error)
      );
      this.openWelcomeSnackBar(this.user.firstName);
      this.router.navigate(['/login']);}
    else {
      this.openErrorSnackBar();
    }
        
  }

  openErrorSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000
    });
  }

  openWelcomeSnackBar(userName: String) {
    this.snackBar.open('Rejestracja zakończona pomyślnie! \nWitaj '+ userName + ' w BTB.', 'Zamknij', {
      duration: 3000
    });
  }

}
