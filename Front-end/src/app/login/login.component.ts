import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage';
import { Router } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { timer } from '../../../node_modules/rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: string;
  userPassword: string;
  hashPassword: any;
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
    this.hashPassword = Md5.hashStr(this.userPassword);
    this.localStorageService.getUser(this.userLogin, this.hashPassword).subscribe(data => { console.log(data);
    this.id = data;
    localStorage.setItem(this.key, this.id);
    this.userId = localStorage.getItem(this.key);

    if(this.userId != ""){
      window.location.reload();
      this.router.navigate(['/home']);
    } else{
      this.openSnackBar();
    }
    });

    
    }

}


