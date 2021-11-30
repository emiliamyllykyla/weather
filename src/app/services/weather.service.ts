import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../Weather';
import { Forecast } from '../Forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Generate your own API key:
  // https://openweathermap.org/api
  APIkey = 'a0785b34a3a6db1b43f873064326248e';
  URL = 'http://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  getCurrentWeather(query: string) {
    if (!query) return;
    return this.http.get<Weather>(
      this.URL + "weather?q=" + query + '&APPID=' + this.APIkey + '&units=metric'
    );
  }

  getForecast(query: string) {
    if (!query) return;
    return this.http.get<Forecast>(
      this.URL + "forecast?q=" + query + '&APPID=' + this.APIkey + '&units=metric'
    );
  }
}
