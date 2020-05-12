import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Player } from '../classes/Player';
import { Competition } from '../classes/Competition';
import { CompetitionsService } from '../competitions.service';
import { Club } from '../classes/Club';
import { NgForm } from '@angular/forms';
import { ClubsService } from '../clubs.service';
import { PlayersService } from '../players.service';
import { LeagueService } from '../league.service';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  p = 1;
  players;
  competitions: Competition[];
  clubs: Club[];
  owners: Map<string, string>;
  minage = 15;
  maxage = 50;
  minvalue = 0;
  maxvalue = 500000000;
  currentcompetition = '';
  currentclub = '';
  currentposition = '';
  currentname = '';

  currentTeam;

  constructor(  private authenticationService: AuthenticationService, private router: Router,
                private competitionService: CompetitionsService,
                private playersService: PlayersService,
                private clubsService: ClubsService,
                private leagueService: LeagueService,
                private teamsService: TeamsService
    ) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigate(['/authentication']);
    }

    this.competitions = this.competitionService.getCompetitions();
    this.clubs = this.clubsService.getClubs();
    this.players = this.playersService.getPlayers();
    this.owners = this.leagueService.getOwners();
    this.currentTeam = this.teamsService.getCurrentTeam();
  }

  changeCompetition(competition) {
    this.currentcompetition = competition;
    this.clubs = this.clubsService.getClubsByCompetition(competition);
  }

  changeClub(club) {
    this.currentclub = club;
  }

  changePosition(pos) {
    this.currentposition = pos;
  }

  changeName(name) {
    this.currentname = name;
  }

  submit() {
      this.players = this.playersService.filterPlayers(
        this.currentname,
        this.currentcompetition,
        this.currentclub,
        this.currentposition,
        this.minage,
        this.maxage,
        this.minvalue,
        this.maxvalue
      );
  }

  setMinAge(min) {
    this.minage = min;
  }

  setMaxAge(max) {
    this.maxage = max;
  }

  setMinValue(min) {
    this.minvalue = min;
  }

  setMaxValue(max) {
    this.maxvalue = max;
  }

  getOwner(id) {
    if (this.owners.get(id) === 'free') {
      return 'free';
    }
    return this.leagueService.getTeamByID(this.owners.get(id));
  }

  buyPlayer(p) {
    this.owners = this.leagueService.changeOwner(p, this.currentTeam.objectid);
    this.currentTeam = this.teamsService.buyPlayer(this.playersService.getPlayerByID(p));
    console.log(this.currentTeam);
    console.log(this.owners);
  }

  sellPlayer(p) {
    this.owners = this.leagueService.changeOwner(p, 'free');
    this.currentTeam = this.teamsService.sellPlayer(this.playersService.getPlayerByID(p));
    console.log(this.currentTeam);
    console.log(this.owners);
  }
}
