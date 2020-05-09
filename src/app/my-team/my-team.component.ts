import { Component, OnInit } from '@angular/core';
import { LineupsService } from '../lineups.service';
import { AuthenticationService } from '../authentication.service';
import { Team } from '../classes/Team';
import { TeamsService } from '../teams.service';
import { Router } from '@angular/router';
import { LeagueService } from '../league.service';
import { MatchService } from '../match.service';
import { PlayersService } from '../players.service';
import { Player } from '../classes/Player';
import { Lineup } from '../classes/Lineup';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  currentTeam: Team;
  currentLineup: Lineup;
  is3_4_3 = false;
  is3_5_2 = false;
  is4_3_3 = false;
  is4_4_2 = false;
  is4_5_1 = false;
  is5_3_2 = false;
  is5_4_1 = false;
  titular1: Player;
  titular2: Player;
  titular3: Player;
  titular4: Player;
  titular5: Player;
  titular6: Player;
  titular7: Player;
  titular8: Player;
  titular9: Player;
  titular10: Player;
  titular11: Player;
  banca1: Player;
  banca2: Player;
  banca3: Player;

  constructor(  private authenticationService: AuthenticationService,
                private matchService: MatchService,
                private lineupsService: LineupsService,
                private teamsService: TeamsService,
                private playersService: PlayersService,
                private router: Router,
                private leagueService: LeagueService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigate(['/authentication']);
    }

    this.currentTeam = this.teamsService.getCurrentTeam();
    this.currentLineup = this.lineupsService.getCurrentTeamLineup();

    if (this.currentTeam.league == null) {
      //this.router.navigate(['/sinliga']);
    }

    if (this.leagueService.getCurrentLeague().members < 20) {
      //this.router.navigate(['/sinliga']);
    }
  }

 

}
