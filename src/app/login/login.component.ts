import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../classes/User';
import { CompetitionsService } from '../competitions.service';
import { ClubsService } from '../clubs.service';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(  private authenticationService: AuthenticationService, private router: Router,
                private clubsService: ClubsService,
                private playersService: PlayersService,
                private competititonsService: CompetitionsService) { }

  modoIniciarSesion = true;
  clossingSession = false;
  invalidForm = false;
  invalidFormR = false;

  user: User;
  ngOnInit(): void {
  }

  changeMode(mode) {
    this.modoIniciarSesion = mode;
  }

  register(register: NgForm) {
    if(register.value.PassR === register.value.Pass2R) {
      this.authenticationService.registervalidate(
        register.value.UsuarioR,
        register.value.PassR,
        register.value.EmailR
        ).then(() => {
      this.router.navigate(['/teams']);
      // console.log('Registered successfully')
    }).catch(() => {
      this.invalidFormR = true;
    });
    } else {
      this.invalidFormR = true;
    }
    
  }

  login(log: NgForm) {
    this.authenticationService.loginvalidate(log.value.Usuario, log.value.Password).then(() => {
      this.competititonsService.updateCompetitions().then(() => {
        this.clubsService.updateClubs().then(() => {
          this.playersService.getAllPlayers().then(() => {
            this.router.navigate(['/teams']);
          });
        });
      });
    }).catch(() => {
      this.invalidForm = true;
    });
  }

}
