import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../City';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  URL =
    'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language=en&q=';

  constructor(private http: HttpClient) {}

  fetchCities(query: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.URL}${query}`);
  }
}
