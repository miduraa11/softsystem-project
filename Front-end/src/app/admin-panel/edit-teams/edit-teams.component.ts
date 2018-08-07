import { Component, OnInit } from '@angular/core';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})
export class EditTeamsComponent implements OnInit {

  teams: Array<any>;
  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAll().subscribe(data =>{this.teams = data});
  }

}
