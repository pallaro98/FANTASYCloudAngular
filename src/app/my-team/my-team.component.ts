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
import { ClubsService } from '../clubs.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  currentTeam: Team;
  currentLineup: Lineup;
  closeResult: string;

  subsMode = false;
  selectedPlayer = -1;
  changesMade = false;
  reserves: Player[];

  constructor(  private authenticationService: AuthenticationService,
                private matchService: MatchService,
                private lineupsService: LineupsService,
                private teamsService: TeamsService,
                private playersService: PlayersService,
                public clubsService: ClubsService,
                private router: Router,
                private modalService: NgbModal,
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

  changeFormation(formation: string) {
    this.changesMade = true;
    this.currentLineup.formation = formation;
  }

  changeMode() {
    this.subsMode = (!this.subsMode);
    this.selectedPlayer = -1;
  }

  save() {
    this.changesMade = false;
  }

  showReserves(reservas: any) {
    this.reserves = this.leagueService.getPlayersByTeam(this.currentTeam.objectid);
    console.log(this.reserves);
    this.reserves = this.reserves.filter((p) => (this.currentLineup.players.indexOf(p) === -1));
    console.log(this.reserves);

    this.modalService.open(reservas, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showPlayer() {

  }

  playerAction(pos) {
    if (this.subsMode) {
      if (this.selectedPlayer === -1) {
        this.selectedPlayer = pos;
      } else {
        const temp = this.currentLineup.players[pos];
        this.currentLineup.players[pos] = this.currentLineup.players[this.selectedPlayer];
        this.currentLineup.players[this.selectedPlayer] = temp;
        
        this.selectedPlayer = -1;
        this.changesMade = true;
      }
    } else {

    }
  }

  reserveAction(r) {
    if (this.subsMode) {
      if (this.selectedPlayer !== -1) {
        this.currentLineup.players[this.selectedPlayer] = r;
        this.selectedPlayer = -1;
        this.changesMade = true;
      }
    }
    this.modalService.dismissAll();

  }

}
