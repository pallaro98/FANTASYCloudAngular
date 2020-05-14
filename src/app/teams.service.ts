import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Team } from './classes/Team';
import { User } from './classes/User';
import { Player } from './classes/Player';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  teams: Team[];
  currentTeam: Team;
  defaultTeam = new Team('defaultteam', 'defaultuser', 'defaultleague', 'free', '', '', 0, 0, 0, 0, 0, '0-0-0');
  constructor(private httpClient: HttpClient) { }

  getTeamsByUserId(userid): Promise<any> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/teams/users/' + userid;

      this.httpClient.get<Team[]>(url).subscribe(teams => {
        const allteams = [];
        teams.forEach(t => {
          allteams.push(new Team(  t['objectid']['S'],
                                t['user']['S'],
                                t['league']['S'],
                                t['name']['S'],
                                t['badge']['S'],
                                t['lineup']['S'],
                                t['budget']['N'],
                                t['value']['N'],
                                t['favorpoints']['N'],
                                t['againstpoints']['N'],
                                t['leaguepoints']['N'],
                                t['record']['S']
          
          ));
        });
        this.teams = allteams;
        resolve(allteams);
      });
    });
  }

  updateCurrentTeam(t: Team) {
    this.currentTeam = t;
  }

  createNewTeam(name: string, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    });

  }

  getCurrentTeam() {
    return this.currentTeam;
  }

  buyPlayer(p: Player) {
    this.currentTeam.budget -= p.value;
    this.currentTeam.value += p.value;
    //todo update db
    return this.currentTeam;
  }

  sellPlayer(p: Player) {
    this.currentTeam.budget += p.value;
    this.currentTeam.value -= p.value;
    //todo update db
    return this.currentTeam;
  }

}
