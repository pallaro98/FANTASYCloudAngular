import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Player } from '../classes/Player';
import { Competition } from '../classes/Competition';
import { CompetitionsService } from '../competitions.service';
import { Club } from '../classes/Club';
import { NgForm } from '@angular/forms';
import { ClubsService } from '../clubs.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  competitions: Competition[];
  clubs: Club[];
  minage = 15;
  maxage = 50;
  minvalue = 0;
  maxvalue = 500000000;
  owners: Map<Player, string>;

  constructor(  private authenticationService: AuthenticationService, private router: Router,
                private competitionService: CompetitionsService,
                private clubsService: ClubsService
    ) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigate(['/authentication']);
    }

    this.competitions = this.competitionService.getCompetitions();
    this.clubs = this.clubsService.getClubs();
  }

  changeCompetition(competition) {
    this.clubs = this.clubsService.getClubsByCompetition(competition);
  }

  submit(log: NgForm) {

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

}
