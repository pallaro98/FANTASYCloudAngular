import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competition } from './classes/Competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  competitions: Competition[];

  constructor(private httpClient: HttpClient) { }

  updateCompetitions(): Promise<any> {

    return new Promise((resolve, reject) => {
      const url = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/competitions/allcompetitions';

      this.httpClient.get<Competition[]>(url).subscribe(competitions => {
        const allcompetitions = [];
        competitions.forEach(c => {
          allcompetitions.push(new Competition(  c['objectid'],
                                                  c['country'],
                                                  c['name'],
                                                  c['logo']
          ));
        });
        this.competitions = allcompetitions;
        console.log(allcompetitions);
        resolve();
      });
    });
  }

  getCompetitions(): Competition[] {
    return this.competitions;
  }
}
