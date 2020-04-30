import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show: boolean;
  inTeams: boolean;
  inSinLiga: boolean;
  userName: string;
  userImage: string;
  private usernameSubscript: Subscription;
  private userimageSubscript: Subscription;


  constructor(  private activatedRoute: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.inSinLiga = true;
    this.router.events.subscribe((val) => {
      this.show = !this.router.url.includes('authentication');
      this.inTeams = !this.router.url.includes('teams');
      //this.inSinLiga = !this.router.url.includes('sinliga');

    });
    this.usernameSubscript = this.authenticationService.currentusername
    .subscribe((dato: string) => {
      this.userName = dato;
    });

    this.userimageSubscript = this.authenticationService.currentuserimage
    .subscribe((dato: string) => {
      this.userImage = dato;
    });
    this.userName = 'Mi usuario';
  }

  cerrarsesion() {
    this.router.navigate(['/authentication']);
    this.userName = 'Mi usuario';
    this.authenticationService.closeSession();
  }

}
