import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../models/countries.model';
import { map, Observable } from 'rxjs';
import { Continents } from '../models/continents.model';

@Injectable({
  providedIn: 'root'
})
export class ContinentsService {

  private readonly url = 'https://restcountries.com/v3.1/all';
  private http = inject(HttpClient);

  /**
   * service gets all countries group by continents
   * @returns An Observable: Continents[]
   */
  getAllContinents(): Observable<Continents[]> {
    return this.http.get<Countries[]>(this.url).pipe(
      map(countries => {
        const continents: Continents[] = [];
    
        countries.forEach((country: Countries) => {
          const continentName = country.continents[0];
          const continent = continents.find((continent) => continent.name === continentName);
    
          if (continent) {
            continent.countries.push(country);
            continent.totalPopulation += country.population;
          } else {
            continents.push({
              name: continentName,
              countries: [country],
              totalPopulation: country.population
            });
          }
        });
        return continents;
      })
    );
  }
}
