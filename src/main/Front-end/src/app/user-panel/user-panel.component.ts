import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserPanelService } from '../services/user-panel.service';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {TokenStorage} from "../token.storage";

const USER_ID = 'User id';

export class ChangePassword{
  id: number;
  currentPassword: String;
  password: String;
}
export class Authentication{
  id: number;
  secretPassword: String;
}

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})

export class UserPanelComponent implements OnInit {

  user: User = new User();
  currentUser: number;
  currentPassword: any;
  password: any;
  authenticationKey: Authentication = new Authentication();
  account: number[]= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  chance: number=0.0;
  dataSourceGraph: Object;
  dataSourceHistory: Object;
  panelOpenGraph: boolean = false;
  panelOpenHistory: boolean = false;
  accountState: Array<any>=new Array(20);
  result: Array<any>=new Array(20);
  changePassword: ChangePassword = new ChangePassword();
  newActivationPassword: String;

  changePasswordForm = new FormGroup({
    currentPassword : new FormControl('', [
      Validators.required,
    ]),
    authentication : new FormControl('', [
      Validators.required,
    ]),
    password : new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
    ]),
    confirmPassword : new FormControl('', [
      Validators.required,
    ])
  });

  changeActivationPasswordForm = new FormGroup({
    changeActivationPassword : new FormControl('',[
      Validators.required,
    ]),
    confirmActivationPassword : new FormControl('', [
      Validators.required,
    ])
  });


  constructor(public tokenStorage: TokenStorage,
    private userPanelService: UserPanelService,
    private logout: AppComponent,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.currentUser = Number(sessionStorage.getItem(USER_ID));
    this.userPanelService.getUserById(this.currentUser).subscribe(data => {
      this.user = data;
    });
    this.userPanelService.getAccount(this.currentUser).subscribe(data => {
        this.account = data;
      });
  }

  isAdmin(){
    let currentUser = this.tokenStorage.getDecodedToken();
    if(currentUser.scopes == "ROLE_ADMIN"){
      return true;
    } else {
      return false;
    }
  }

  saveActivationPassword(){
    if(this.changeActivationPasswordForm.valid){
      this.newActivationPassword = this.changeActivationPasswordForm.get('changeActivationPassword').value;
      this.userPanelService.saveActivationPassword(this.newActivationPassword).subscribe( data => {
        this.openSnackBar(5);
        this.changeActivationPasswordForm.get('changeActivationPassword').setValue('');
        this.changeActivationPasswordForm.get('confirmActivationPassword').setValue('');
      })
    } else {
      this.openSnackBar(2);
    }
  }

  save(){
    this.currentPassword = this.changePasswordForm.get('currentPassword').value;
    this.password = this.changePasswordForm.get('password').value;
    if(this.changePasswordForm.get('currentPassword').errors==null && this.changePasswordForm.get('password').errors==null && this.changePasswordForm.get('confirmPassword').errors==null){
      this.changePassword.id = this.user.id;
      this.changePassword.currentPassword = this.currentPassword;
      this.changePassword.password = this.password;
      this.userPanelService.changePassword(this.changePassword).subscribe(data => {
        if(data=="true"){
          this.openSnackBar(1);
          this.logout.logout();
          this.router.navigate(['/login']);
        }
        else {
          this.openSnackBar(2);
        }
      });
    }
  }

  authentication(){
    if(this.changePasswordForm.get('authentication').errors==null){
      this.authenticationKey.secretPassword = this.changePasswordForm.get('authentication').value;
      this.authenticationKey.id = this.user.id;
      this.userPanelService.authentication(this.authenticationKey).subscribe(data => {
        if(data=="true"){
          this.openSnackBar(3);
          this.router.navigate(['/events']);
        }
        else {
          this.openSnackBar(4);
        }
      });
    }
  }

  openSnackBar(flag: number) {
    switch (flag) {
      case 1:
        this.snackBar.open('Hasło zostało zmienione!\nZaloguj się ponownie przy użyciu nowego hasła.', 'Zamknij', {
          duration: 3000
        });
        break;
      case 2:
        this.snackBar.open('Wystąpił błąd przy zmianie hasła!', 'Zamknij', {
          duration: 3000
        });
        break;
      case 3:
        this.snackBar.open('Weryfikacja zakończona pomyślnie!', 'Zamknij', {
          duration: 3000
        });
        break;
      case 4:
        this.snackBar.open('Weryfikacja nie powiodła się!', 'Zamknij', {
          duration: 3000
        });
        break;
      case 5:
        this.snackBar.open('Hasło zostało zmienione!', 'Zamknij', {
          duration: 3000
        });
        break;
      default:
        this.snackBar.open('Wystąpił błąd.', 'Zamknij', {
          duration: 3000});
        break;
    }
  }

  getGraph(){
    if((this.account[4]+this.account[5])>=4.0)
    this.chance = (this.account[4]/(this.account[4]+this.account[5]))*100;
     else
    this.chance = 50.0;
    this.dataSourceGraph = {
      "chart": {"caption": "Szanse wygranej w kolejnym zakładzie","lowerlimit": "0","upperlimit": "100","showvalue": "5","numbersuffix": "%","theme": "candy","showtooltip": "0"
      },
      "colorrange": {
        "color": [
          {"minvalue": "0", "maxvalue": "33","code": "#D40000"},
          {"minvalue": "33", "maxvalue": "66", "code": "#0077FF"},
          {"minvalue": "66", "maxvalue": "100", "code": "#00A300"}
        ]
      },
      "dials": {"dial": [{"value": this.chance}]}
    };
  }

  getHistory(){
    this.userPanelService.getHistory(this.currentUser).subscribe(data => {
      for (let index = 0; index < data[0][0]; index++) {
        this.accountState[index]={value: data[data[0][0]-index][1]};
        this.result[index]={value: data[data[0][0]-index][0]};
      }
      this.dataSourceHistory = {
        "chart": {
          "caption": "Twoja oś czasu",
          "yaxisname": "",
          "subcaption": "dane z ostatnich 20 zakładów",
          "showhovereffect": "1",
          "numbersuffix": "PLN",
          "drawcrossline": "1",
          "plottooltext": "<b>$dataValue</b> $seriesName",
          "theme": "fusion"
        },
        "categories": [
          {
            "category": [{"label": "I"},{"label": "II"},{"label": "III"},{"label": "IV"},{"label": "V"},{"label": "VI"},{"label": "VII"},{"label": "VIII"},{"label": "IX"},{"label": "X"},{"label": "XI"},{"label": "XII"},{"label": "XIII"},{"label": "XIV"},{"label": "XV"},{"label": "XVI"},{"label": "XVII"},{"label": "XVIII"},{"label": "XIX"},{"label": "XX"}]
          }
        ],
        "dataset": [
          {
            "seriesname": "Wynik zakładu",
            "data": this.result
          },
          {
            "seriesname": "Stan konta",
            "data": this.accountState
          }
        ]
    }
    });
  }

}
