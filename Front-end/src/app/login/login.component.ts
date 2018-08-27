import { Component } from '@angular/core';
import { LocalStorageService } from '../services/localStorage';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLogin: string;
  userPassword: string;
  hashPassword: any;
  key: string = "User id";
  id: any;
  userId: any;

  constructor(private localStorageService: LocalStorageService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  openSnackBar(): void {
    this.snackBar.open('Niepoprawny login lub hasło !', 'Zamknij', {
      duration: 3000
    });
  }

  login(): void {
    this.hashPassword = Md5.hashStr(this.userPassword);
    this.localStorageService.getUser(this.userLogin, this.hashPassword).subscribe(data => {
      this.id = data;
      localStorage.setItem(this.key, this.id);
      this.userId = localStorage.getItem(this.key);
      if(this.userId != "") {
        window.location.reload();
        this.router.navigate(['/home']);
      } else { this.openSnackBar(); }
    });    
  }

}
