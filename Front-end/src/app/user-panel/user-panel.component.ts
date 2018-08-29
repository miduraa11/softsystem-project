import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserPanelService } from '../services/user-panel.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
const USER_ID = 'User id';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
  account: number[]= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  chance: number=0.0;
  dataSourceGraph: Object;
  dataSourceHistory: Object;
  panelOpenGraph: boolean = false;
  panelOpenHistory: boolean = false;
  accountState: Array<any>=new Array(20);
  result: Array<any>=new Array(20);

  //current password
  currentPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);
  matcherCurrentPassword = new MyErrorStateMatcher();
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

  constructor(private userPanelService: UserPanelService,
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

  save(){
    this.currentPassword = this.currentPasswordFormControl.value;
    this.password = this.passwordFormControl.value;
    if(this.currentPasswordFormControl.errors==null && this.passwordFormControl.errors==null && this.confirmPasswordFormControl.errors==null)
      this.userPanelService.changePassword(this.user.id, this.currentPassword, this.password).subscribe(data => {
        if(data){
          this.openSnackBar(1);
          this.logout.logout();
          this.router.navigate(['/login']);
        }
        else {
          this.openSnackBar(2);
        }
      });
  }

  openSnackBar(flag: number) {
    if(flag==1){
    this.snackBar.open('Hasło zostało zmienione!\nZaloguj się ponownie przy użyciu nowego hasła.', 'Zamknij', {
      duration: 3000
    });
  } else {
    this.snackBar.open('Wystąpił błąd przy zmianie hasła!', 'Zamknij', {
      duration: 3000
    });
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
          {"minvalue": "0", "maxvalue": "33","code": "#F2726F"},
          {"minvalue": "33", "maxvalue": "66", "code": "#FFC533"},
          {"minvalue": "66", "maxvalue": "100", "code": "#62B58F"}
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
