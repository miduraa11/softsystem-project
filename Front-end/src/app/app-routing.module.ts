import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent }      from './events/events.component';
import { BetsComponent }        from './bets/bets.component';
import { AdminPanelComponent }  from './admin-panel/admin-panel.component';
import { EditEventsComponent }  from './admin-panel/edit-events/edit-events.component';
import { EditPlayersComponent } from './admin-panel/edit-players/edit-players.component';
import { EditTeamsComponent }   from './admin-panel/edit-teams/edit-teams.component';
import { EditDisciplineComponent }   from './admin-panel/edit-discipline/edit-discipline.component';
import { EditUsersComponent }   from './admin-panel/edit-users/edit-users.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'app-component', component: EventsComponent },
  { path: 'bets', component: BetsComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'edit-events', component: EditEventsComponent },
  { path: 'edit-players', component: EditPlayersComponent },
  { path: 'edit-teams', component: EditTeamsComponent },
  { path: 'edit-discipline', component: EditDisciplineComponent },
  { path: 'edit-users', component: EditUsersComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-panel', component: UserPanelComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})



export class AppRoutingModule {}
