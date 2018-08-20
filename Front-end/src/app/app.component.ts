import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'BTB';
  isActive: boolean;
  key: string = "User id";
  userId: any;

  ngOnInit() {
    this.userId = localStorage.getItem(this.key);

    if(this.userId == null){
      this.isActive = false;
    } else{
      this.isActive = true;
    }
    
  }


  logout(){
    localStorage.setItem(this.key, "");
    this.userId = localStorage.getItem(this.key);
    window.location.reload();
    localStorage.clear();
    
  }
}


