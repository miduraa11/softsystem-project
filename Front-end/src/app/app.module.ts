import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { BetsComponent } from './bets/bets.component';
import { ResultsComponent } from './results/results.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AlertModule } from 'ngx-bootstrap';
import { EditEventsComponent } from './admin-panel/edit-events/edit-events.component';
import { EditTeamsComponent } from './admin-panel/edit-teams/edit-teams.component';
import { EditPlayersComponent, RemovePlayerDialog} from './admin-panel/edit-players/edit-players.component';
import { EditUsersComponent } from './admin-panel/edit-users/edit-users.component';
import { PlayerService } from './admin-panel/player.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PlayerEditComponent } from './admin-panel/edit-players/player-edit/player-edit.component';
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '../../node_modules/@angular/material';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventDetailComponent,
    MessagesComponent,
    BetsComponent,
    ResultsComponent,
    AdminPanelComponent,
    EditEventsComponent,
    EditTeamsComponent,
    EditPlayersComponent,
    EditUsersComponent,
    PlayerEditComponent,
    RemovePlayerDialog
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    MatExpansionModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [EditPlayersComponent, RemovePlayerDialog],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }