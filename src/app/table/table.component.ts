import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { LeagueService } from '../league.service';
import { TeamsService } from '../teams.service';
import { Team } from '../classes/Team';
import { League } from '../classes/League';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  teamsLeague: Team[];

  constructor(  private authenticationService: AuthenticationService,
                private router: Router, private leagueService: LeagueService,
                private teamsService: TeamsService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigate(['/authentication']);
    }
    this.leagueService.getteamsLeague().then(teams => {
      this.teamsLeague = teams;
      console.log(this.teamsLeague);
    });
  }

}
