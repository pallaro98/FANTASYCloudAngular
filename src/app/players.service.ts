import { Injectable } from '@angular/core';
import { Player } from './classes/Player';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  players: Player[];
  defaultplayer = new Player('defaultplayer', 'defaultclub', 'defaultcountry', 'no player', 'https://res.cloudinary.com/pallarofantasy/image/upload/v1589322382/Fantasy/Players/default_vds0tz.png', 'GK-RWB-RB-CB-LB-LWB-RM-CDM-CM-CAM-LM-RW-CF-ST-LW', 0, 0, 0);
  playersToShow: Player[];
  currentPlayer: Player;

  constructor(private httpClient: HttpClient) { }

  getPlayer(): Player {
    return this.currentPlayer;
  }

  getPlayerByID(id: string): Player {
    if (id === 'defaultplayer') {
      return this.defaultplayer;
    }
    return this.players.slice().filter(futbolista => (futbolista.objectid === id))[0];
  }

  getAllPlayers(): Promise<Player[]> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/players/allplayers';

      this.httpClient.get<Player[]>(url).subscribe(players => {
        const allplayers = [];
        players.forEach(p => {
          if (p.objectid !== 'defaultplayer') {
            allplayers.push(new Player(   p['objectid'],
                                          p['club'],
                                          p['country'],
                                          p['name'],
                                          p['photo'],
                                          p['positions'],
                                          p['value'],
                                          p['points'],
                                          this.findAge(p['birthday'])
            ));
          }
        });
        this.players = allplayers;
        console.log(allplayers);
        resolve(allplayers);
      });
    });
  }

findAge(date): number {
  const today = new Date();
  const BirthDate = new Date(date);
  let age = today.getFullYear() - BirthDate.getFullYear();
  const month = today.getMonth() - BirthDate.getMonth();
  if (month < 0) {
    age--;
  }
  return age;
}


getPlayers() {
  return this.players;
}

filterPlayers(name, competition, club, pos, minage, maxage, minvalue, maxvalue): Player[] {
  let filtroFutbolistas = this.players.slice();
  if (name !== '') {
    filtroFutbolistas = filtroFutbolistas.filter(futbolista => (futbolista.name.indexOf(name) > -1));
  }
  if (competition !== '') {
    //filtroFutbolistas = filtroFutbolistas.filter(futbolista => (futbolista.competition === competition));
  }
  if (club !== '') {
    filtroFutbolistas = filtroFutbolistas.filter(futbolista => (futbolista.club === club));
  }
  if (pos !== '') {
    filtroFutbolistas = filtroFutbolistas.filter(futbolista => (futbolista.positions.indexOf(pos) > -1));
  }
  filtroFutbolistas = filtroFutbolistas.filter(futbolista => (futbolista.age > minage && futbolista.age < maxage && futbolista.value>minvalue && futbolista.value<maxvalue));

  return filtroFutbolistas;
}

getPlayersArrayByID(p: string[]): Player[] {
  const players = [];
  console.log(p);
  p.forEach(a => {
    players.push(this.getPlayerByID(a));
  });
  return players;
}


}
