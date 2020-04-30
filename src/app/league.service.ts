import { Injectable } from '@angular/core';
import { TeamsService } from './teams.service';
import { League } from './classes/League';
import { HttpClient } from '@angular/common/http';
import { Team } from './classes/Team';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  currentLeague: League;
  teamsLeague: Team[];
  constructor(private teamsService: TeamsService, private httpClient: HttpClient) { }


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
            return (b.favorpoints - b.againstpoints) - (a.favorpoints - a.againstpoints)
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
}
