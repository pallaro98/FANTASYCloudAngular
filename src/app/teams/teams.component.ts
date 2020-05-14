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
  teamShield: any;
  teamName: any;
  getFile(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.teamName = event.target.files[0].name;
      console.log('file: ', file);
      let newFile;
      let fr = new FileReader();
      fr.readAsDataURL(file)
      fr.onload = (event:any)=>{
          let base64 = event.target.result;
          this.teamShield = base64;
      }
      
      console.log(file)
      console.log(newFile) // Either prints undefined or whatever initial value it contains

    }
  }

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
    this.lineupsService.getLineupByMatchdayTeam('1', t.objectid, 'current').then(() => { //test change 1 to jornada actual
      this.leagueService.getLeagueById(t.league).then(() => {
        this.leagueService.getteamsLeague().then(() => {
          this.leagueService.getOwnersByLeague().then(() => {
            this.router.navigate(['/myteam']);
          });
        });
      });
    });
  }

  addTeam(form: NgForm) {
    console.log('Gay quien lo lea excepto el que lo escribio');
    console.log(form.value);
    this.teamsService.createNewTeam(form.value.nombreEquipo, this.teamShield, 
      this.user.objectid, this.teamName).then(() => {
      this.modalService.dismissAll();
      this.teamsService.getTeamsByUserId(this.user.objectid).then((t) => {
        this.teams = t;
        console.log(this.teams);
      });
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
