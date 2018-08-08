import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../player.service';
import { NgForm } from '@angular/forms';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit, OnDestroy {
  
  player: any = {}

  sub: Subscription

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService) {
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.playerService.get(id).subscribe((player: any) => {
          if (player) {
            this.player = player;
            this.player.href = player._links.self.href;
            } else {
            console.log(`Player with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/edit-players']);
  }

  save(form: NgForm) {
    this.playerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.playerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}