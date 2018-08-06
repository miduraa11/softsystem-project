import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent }      from './events/events.component';
import { BetsComponent }      from './bets/bets.component';
import { AdminPanelComponent }      from './admin-panel/admin-panel.component';
import { ResultsComponent }      from './results/results.component';
const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'bets', component: BetsComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})



export class AppRoutingModule {}
