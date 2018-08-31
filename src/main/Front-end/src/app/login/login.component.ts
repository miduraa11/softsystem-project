import { Component } from '@angular/core';
import { LocalStorageService } from '../services/localStorage';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { TokenStorage } from '../token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private localStorageService: LocalStorageService,
    private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService, 
    private token: TokenStorage
  ) { }

  openSnackBar(): void {
    this.snackBar.open('Niepoprawny login lub hasło !', 'Zamknij', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        if(data!=false){
          this.token.saveToken(data.token);
          this.router.navigate(['home']);
        }
        else 
          this.openSnackBar();
      }
    );
  }

}
