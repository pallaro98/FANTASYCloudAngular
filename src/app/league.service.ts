import { Injectable } from '@angular/core';
import { TeamsService } from './teams.service';
import { League } from './classes/League';
import { HttpClient } from '@angular/common/http';
import { Team } from './classes/Team';
import { Player } from './classes/Player';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  currentLeague: League;
  teamsLeague: Team[];
  owners: Map<string, string>;
  constructor(private teamsService: TeamsService, private playersService: PlayersService, private httpClient: HttpClient) { }


  getLeagueById(id): Promise<any> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/itembyid/' + 'leaguesFANTASY' + '-' + id;

      this.httpClient.get<League>(url).subscribe(league => {

        const objectid = league['objectid'];
        const user = league['user'];
        const name = league['name'];
        const code = league['code'];
        const logo = league['logo'];
        const members = league['members'];

        const l = new League(objectid, user, name, code, logo, members);
        this.currentLeague = l;
        console.log(l);
        resolve(l);
      });
    });
  }

  getOwnersByLeague() {
    return new Promise ((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/owners/' + this.currentLeague.objectid;
      this.httpClient.get<any[]>(url).subscribe(owner => {
        const leagueowners = new Map<string, string>();
        owner.forEach(o => {
          leagueowners.set(o['player']['S'], o['team']['S']);
        });
        this.owners = leagueowners;
        console.log(leagueowners);
        console.log(this.owners);

        resolve(leagueowners);
      });
    });
  }

  getteamsLeague(): Promise<Team[]> {
    return new Promise ((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/teams/teamsbyleague/' + this.currentLeague.objectid;
      this.httpClient.get<Team[]>(url).subscribe(teams => {
        const allteams = [];
        teams.forEach(t => {
          allteams.push(new Team( t['objectid']['S'],
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

        allteams.sort((a, b) => {
          if (b.leaguepoints !== a.leaguepoints) {
            return b.leaguepoints - a.leaguepoints;
          } else if ((b.favorpoints - b.againstpoints) !== (a.favorpoints - a.againstpoints)) {
            return (b.favorpoints - b.againstpoints) - (a.favorpoints - a.againstpoints);
          } else {
            return b.favorpoints - a.favorpoints;
          }
        });

        this.teamsLeague = allteams;
        resolve(allteams);
      });
    });
  }

  getCurrentLeague() {
    return this.currentLeague;
  }

  getOwners() {
    return this.owners;
  }

  getTeamByID(id) {
    if (id === 'defaultteam') {
      return this.teamsService.defaultTeam;
    }
      return this.teamsLeague.slice().filter(team => (team.objectid === id))[0];
  }

  gteamsLeague() {
    return this.teamsLeague;
  }

  changeOwner(p, t) {
    this.owners.delete(p);
    this.owners.set(p, t);
    //todo update db
    return this.owners;
  }

  getPlayersByTeam(teamid) {
    const arr = [...this.owners.entries()]
        .filter(({ 1: v }) => v === teamid)
        .map(([k]) => this.playersService.getPlayerByID(k));
    return arr;
  }
}
