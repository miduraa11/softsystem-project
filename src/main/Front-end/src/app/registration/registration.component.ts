import { Component } from '@angular/core';
import { User } from '../model/user';
import { RegistrationService } from '../services/registration.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

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

  loginExist(): void {
    this.registrationService.getLoginExist(this.registrationForm.get('login').value).subscribe(data => {
      this.existLogin = data
      if(!this.existLogin) { this.addUser(); }
      else { this.openLoginSnackBar(); }
    });
  }

  addUser(): void {
    if(this.registrationForm.valid) {
      this.user.email = this.registrationForm.get('email').value;
      this.user.firstName = this.registrationForm.get('firstName').value;
      this.user.lastName = this.registrationForm.get('lastName').value;
      this.user.username = this.registrationForm.get('login').value;
      this.user.password = this.registrationForm.get('password').value;
      this.registrationService.addUser(this.user).subscribe(data => {
        console.log(data);
        this.openWelcomeSnackBar(this.user.firstName);
        this.router.navigate(['/login']);
      });
    } else { this.openErrorSnackBar(); }        
  }

  openLoginSnackBar() {
    this.snackBar.open('Podany login już istnieje!\nProszę podać inny lub zalogować się na istniejące konto.', 'Zamknij', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  openErrorSnackBar() {
    this.snackBar.open('Niepoprawnie wprowadzone dane!', 'Zamknij', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  openWelcomeSnackBar(userName: String) {
    this.snackBar.open('Rejestracja zakończona pomyślnie! \nWitaj '+ userName + ' w BTB.', 'Zamknij', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
