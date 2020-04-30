import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeamsComponent } from './teams/teams.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { LeagueComponent } from './league/league.component';
import { MarketComponent } from './market/market.component';
import { RulesComponent } from './rules/rules.component';
import { TableComponent } from './table/table.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchComponent } from './match/match.component';
import { PlayersComponent } from './players/players.component';


const routes: Routes = [{path: '', redirectTo: '/authentication', pathMatch: 'full'},
{path: 'authentication', component: LoginComponent},
{path: 'teams', component: TeamsComponent},
{path: 'myteam', component: MyTeamComponent},
{path: 'market', component: MarketComponent},
{path: 'players', component: PlayersComponent},
{path: 'howtoplay', component: RulesComponent},
{path: 'league', component: LeagueComponent, children: [
  {path: '', component: TableComponent},
  {path: 'matches', component: MatchesComponent, children: [
    {path: '', component: MatchesComponent},
    {path: ':id', component: MatchComponent}
  ]},
  {path: 'table', component: TableComponent}
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
