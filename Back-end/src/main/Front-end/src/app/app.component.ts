import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from './services/localStorage';
import { Subscription } from 'rxjs/Subscription';
import { TokenData, TokenStorage } from './token.storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'BTB';
  isActive: boolean;
  userRole: any;
  private subscription = new Subscription();

  constructor(private localStorageService: LocalStorageService,
    private tokenStorage: TokenStorage
  ) { }

  ngOnInit(): void {
    this.afterTokenRetrivial(this.tokenStorage.getDecodedToken());
    this.subscription.add(
      this.tokenStorage.userEmitter.subscribe((token: TokenData) => this.afterTokenRetrivial(token))
    );
  }

  private afterTokenRetrivial(token: TokenData) {
    if (token) {
      this.userRole = token.scopes;
      this.isActive = true;
    } else {
      delete this.userRole;
      delete this.isActive;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.tokenStorage.signOut();
  }

}
