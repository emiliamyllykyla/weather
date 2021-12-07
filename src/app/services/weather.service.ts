import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Generate your own API key:
  // https://openweathermap.org/api
  APIkey = 'a0785b34a3a6db1b43f873064326248e';
  URL = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  fetchAPI(query: string, api: string) {
    return fetch(
      `${this.URL}${api}?q=${query}&APPID=${this.APIkey}&units=metric`
    ).then((res) => res.json());
  }

  getCurrentWeather(query: string) {
    return this.fetchAPI(query, 'weather');
  }

  getForecast(query: string) {
    return this.fetchAPI(query, 'forecast');
  }
}
