import { Injectable } from '@angular/core';
import { Player } from './classes/Player';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  players: Player[];
  currentPlayer: Player;

  constructor(private httpClient: HttpClient) { }

  getPlayer(): Player {
    return this.currentPlayer;
  }

  getPlayerByID(id: number): Promise<Player> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/itembyid/' + 'playersFANTASY' + '-' + id;

      this.httpClient.get<Player>(url).subscribe(player => {

        const objectid = player['objectid'];
        const club = player['club'];
        const country = player['country'];
        const name = player['name'];
        const photo = player['photo'];
        const positions = player['positions'];
        const value = player['value'];
        const points = player['points'];

        const p = new Player(objectid, club, country, name, photo, positions, value, points);
        this.currentPlayer = p;
        console.log(p);
        resolve(p);
      });
    });
  }

  filterPlayers(name, competition, club, position, minage, maxage, minvalue, maxvalue): Promise<Player[]> {

    return new Promise((resolve, reject) => {
      const url = 'url'  + 'playersFANTASY' + '-'
                      + ((name !== '') ? '*' : name) + '-'
                      + ((club !== '') ? '*' : club) + '-'
                      + ((position !== '') ? '*' : position) + '-'
                      + minage + '-'
                      + maxage + '-'
                      + minvalue + '-'
                      + maxvalue;

      this.httpClient.get<Player[]>(url).subscribe(players => {
        const allplayers = [];
        players.forEach(p => {
          allplayers.push(new Player(   p['objectid']['S'],
                                        p['user']['S'],
                                        p['league']['S'],
                                        p['name']['S'],
                                        p['badge']['S'],
                                        p['lineup']['S'],
                                        p['budget']['N'],
                                        p['value']['N']
          ));
        });
        this.players = allplayers;
        resolve(allplayers);
      });
    });
  }
}
