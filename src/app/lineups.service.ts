import { Injectable } from '@angular/core';
import { Lineup } from './classes/Lineup';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineupsService {
  currentTeamLineup: Lineup;
  matchLocalLineup: Lineup;
  matchAwayLineup: Lineup;

  constructor(private httpClient: HttpClient) { }

  getLineupByMatchdayTeam(matchday, team, select): Promise<any> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/lineups/' + matchday + '-' + team;

      this.httpClient.get<Lineup>(url).subscribe(lineup => {

        console.log(lineup);

        const objectid = lineup['objectid'];
        const formation = lineup['formation'];
        const captain = lineup['captain'];
        const matchday = lineup['matchday'];
        const points = lineup['points'];
        const team = lineup['team'];
        const player1 = lineup['players'][0];
        const player2 = lineup['players'][1];
        const player3 = lineup['players'][2];
        const player4 = lineup['players'][3];
        const player5 = lineup['players'][4];
        const player6 = lineup['players'][5];
        const player7 = lineup['players'][6];
        const player8 = lineup['players'][7];
        const player9 = lineup['players'][8];
        const player10 = lineup['players'][9];
        const player11 = lineup['players'][10];
        const bench1 = lineup['bench'][0];
        const bench2 = lineup['bench'][1];
        const bench3 = lineup['bench'][2];

        const l = new Lineup( objectid, formation,
                              captain, matchday,
                              points, team,
                              player1, player2,
                              player3, player4,
                              player5, player6,
                              player7, player8,
                              player9, player10,
                              player11, bench1,
                              bench2, bench3);

        switch (select) {
          case'current': {
            this.currentTeamLineup = l;
            break;
          }
          case 'local': {
            this.matchLocalLineup = l;
            break;
          }
          case 'away': {
            this.matchAwayLineup = l;
            break;
          }
          default: {
            break;
          }
        }
        console.log(l);
        resolve(l);
      });
    });
  }


  getCurrentTeamLineup() {
    return this.currentTeamLineup;
  }

}
