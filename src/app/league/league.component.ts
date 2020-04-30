import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { LeagueService } from '../league.service';
import { League } from '../classes/League';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  league: League;
  constructor(private authenticationService: AuthenticationService, private router: Router, private leagueService: LeagueService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigate(['/authentication']);
    }
    this.league = this.leagueService.getCurrentLeague();

  }

}
