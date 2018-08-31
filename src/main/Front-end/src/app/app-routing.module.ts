import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { LoginGuardService as LoginGuard } from './services/login-guard.service';

const routes: Routes = [
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'app-component', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'bets', component: BetsComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN'}},
  { path: 'edit-events', component: EditEventsComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN'} },
  { path: 'edit-players', component: EditPlayersComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN'} },
  { path: 'edit-teams', component: EditTeamsComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN'} },
  { path: 'edit-discipline', component: EditDisciplineComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN'} },
  { path: 'edit-users', component: EditUsersComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN'} },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})




export class AppRoutingModule {}
