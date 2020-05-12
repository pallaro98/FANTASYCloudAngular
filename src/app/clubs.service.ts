import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Club } from './classes/Club';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  clubs: Club[];

  constructor(private httpClient: HttpClient) { }

  updateClubs(): Promise<any> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/clubs/allclubs';

      this.httpClient.get<Club[]>(url).subscribe(clubs => {
        const allclubs = [];
        clubs.forEach(c => {
          allclubs.push(new Club(   c['objectid'],
                                    c['name'],
                                    c['competition'],
                                    c['badge'],
                                    c['uniform']
          ));
        });
        this.clubs = allclubs;
        console.log(allclubs);
        resolve();
      });
    });
  }

  getClubs(): Club[] {
    return this.clubs;
  }

  getClubsByCompetition(competition: string): Club[] {
    return this.clubs.filter(c => c.competition === competition);
  }

  getUniform(id: string): string {
    return this.clubs.slice().filter(club => (club.objectid === id))[0].uniform;
  }
}
