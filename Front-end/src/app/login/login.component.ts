import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage';
import { Router } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';

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


