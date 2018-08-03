import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  human : Human = {name: "", lastName : "", age : 0};

  onClick() {
    console.log(this.human)
  }
}

interface Human {
  name : String;
  lastName : String;
  age : number;
}

