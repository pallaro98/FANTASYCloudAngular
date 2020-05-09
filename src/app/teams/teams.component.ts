import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';
import { Team } from '../classes/Team';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LeagueService } from '../league.service';
import { LineupsService } from '../lineups.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  user: User;
  teams: Team[];
  invalidForm = true;
  closeResult: string;
  competitionInfo: number;
  constructor(  private authenticationService: AuthenticationService, private router: Router,
                private teamsService: TeamsService, private modalService: NgbModal,
                private lineupsService: LineupsService, private leagueService: LeagueService) {
  }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigate(['/authentication']);
    }
    this.user = this.authenticationService.getUser();
    this.teamsService.getTeamsByUserId(this.user.objectid).then((t) => {
      this.teams = t;
      console.log(this.teams);
    });
  }

  updateCurrentTeam(t: Team) {
    this.teamsService.updateCurrentTeam(t);
    this.lineupsService.getLineupByMatchdayTeam('1', t.objectid, 'current').then(() => { //test
      this.leagueService.getLeagueById(t.league).then(() => {
        this.router.navigate(['/myteam']);
      });
    });
  }

  addTeam(form: NgForm) {
    console.log(form.value);

    this.teamsService.createNewTeam(form.value.nombreEquipo, this.user).then(() => {
      this.modalService.dismissAll();
      //this.router.navigate(['/miequipo']);
      console.log("se creo el equipo");
    }).catch(err => {
        console.log(err);
      });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  changeCompetitionInfo(i: number) {
      this.competitionInfo = i;
  }

}
