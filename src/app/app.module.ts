import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { MyTeamComponent } from './my-team/my-team.component';
import { LeagueComponent } from './league/league.component';
import { MarketComponent } from './market/market.component';
import { HeaderComponent } from './header/header.component';
import { RulesComponent } from './rules/rules.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchComponent } from './match/match.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeamsComponent,
    MyTeamComponent,
    LeagueComponent,
    MarketComponent,
    HeaderComponent,
    RulesComponent,
    PlayerComponent,
    PlayersComponent,
    MatchesComponent,
    MatchComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
