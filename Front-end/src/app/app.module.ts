import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { BetsComponent } from './bets/bets.component';
import { ResultsComponent } from './results/results.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AlertModule } from 'ngx-bootstrap';
import { EditEventsComponent, EditEventModal } from './admin-panel/edit-events/edit-events.component';
import { EditTeamsComponent } from './admin-panel/edit-teams/edit-teams.component';
import { EditPlayersComponent } from './admin-panel/edit-players/edit-players.component';
import { EditUsersComponent } from './admin-panel/edit-users/edit-users.component';
import { EventService } from './event.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    MessagesComponent,
    BetsComponent,
    ResultsComponent,
    AdminPanelComponent,
    EditEventsComponent,
    EditTeamsComponent,
    EditPlayersComponent,
    EditUsersComponent,
    EditEventModal
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
    NgbModule.forRoot(),
    MatDialogModule
  ],
  entryComponents: [EditEventModal],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
