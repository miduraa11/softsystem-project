import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent, BetTheBetDialog, BetTheBetConfirmDialog } from './events/events.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { BetsComponent, InfoDialog } from './bets/bets.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminDeleteObjectComponent, ErrorInfoDialog } from './admin-panel/admin-panel-delete-object.component';
import { AlertModule } from 'ngx-bootstrap';
import { EditEventsComponent, UserListModal, ResolveEventDialog, UpdateEventDialog } from './admin-panel/edit-events/edit-events.component';
import { EditTeamsComponent, UpdateTeamDialog } from './admin-panel/edit-teams/edit-teams.component';
import { EditDisciplineComponent, UpdateDisciplineDialog } from './admin-panel/edit-discipline/edit-discipline.component';
import { EditPlayersComponent, UpdatePlayerDialog } from './admin-panel/edit-players/edit-players.component';
import { EditUsersComponent } from './admin-panel/edit-users/edit-users.component';
import { PlayerService } from './services/player.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'
import { EventService } from './services/event.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TeamService } from './services/team.service';
import { DisciplineService } from './services/discipline.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatNativeDateModule, MatTableModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { UserService } from './services/user.service';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './services/registration.service';
import { LoginComponent } from './login/login.component';
import { LocalStorageService } from './services/localStorage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { BetsService } from './services/bets.service';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserPanelService } from './services/user-panel.service';
import { FusionChartsModule } from 'angular-fusioncharts';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import FusionCharts from 'fusioncharts/core';
import AngularGauge from 'fusioncharts/viz/angulargauge';
import MsLine from 'fusioncharts/viz/msline';

FusionChartsModule.fcRoot(FusionCharts, AngularGauge, MsLine);

const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    BetsComponent,
    AdminPanelComponent,
    AdminDeleteObjectComponent,
    ErrorInfoDialog,
    EditEventsComponent,
    UpdateEventDialog,
    EditTeamsComponent,
    EditDisciplineComponent,
    EditPlayersComponent,
    EditUsersComponent,
    ResolveEventDialog,
    UpdatePlayerDialog,
    UpdateTeamDialog,
    UpdateDisciplineDialog,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    BetTheBetDialog,
    BetTheBetConfirmDialog,
    UserListModal,
    InfoDialog,
    UserPanelComponent
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
    NgbModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatTableModule,
    FusionChartsModule,
    MatRadioModule,
    MatGridListModule
  ],
  entryComponents: [
    AdminDeleteObjectComponent,
    ErrorInfoDialog,
    ResolveEventDialog,
    UpdateEventDialog,
    UpdatePlayerDialog,
    UpdateTeamDialog,
    BetTheBetDialog,
    BetTheBetConfirmDialog,
    UpdateDisciplineDialog,
    UserListModal,
    InfoDialog
  ],
  providers: [
    PlayerService,
    EventService,
    TeamService,
    DisciplineService,
    UserService,
    RegistrationService,
    LocalStorageService,
    BetsService,
    UserPanelService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
