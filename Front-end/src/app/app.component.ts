import { Component } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  human : Human = {name: "", lastName : "", age : 0};

  constructor(private http: HttpClient){

  }

  onClick() {
    console.log(this.human)
    this.http.post("api/human/add", this.human).subscribe(x => {
      console.log("success");
      this.http.get("api/human").subscribe(x => console.log(x));
    });
  }
}

interface Human {
  name : String;
  lastName : String;
  age : number;
}

