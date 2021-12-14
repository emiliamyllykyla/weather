import { Injectable } from '@angular/core';
import { Coordinates } from '../City';
import { Forecast } from '../Forecast';
import { Weather } from '../Weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Generate your own API key:
  // https://openweathermap.org/api
  APIkey = 'a0785b34a3a6db1b43f873064326248e';
  URL = 'https://api.openweathermap.org/data/2.5/';

  constructor() {}

  fetchAPI(param: string | Coordinates, api: 'weather' | 'forecast') {
    // Search by city name (user typed input and clicked "search")
    // or coordinates(user clicked an option in suggestion dropdown)
    const searchBy =
      typeof param === 'string'
        ? `q=${param}`
        : `lat=${param.lat}&lon=${param.lon}`;

    return fetch(
      `${this.URL}${api}?${searchBy}&APPID=${this.APIkey}&units=metric`
    ).then((res) => res.json());
  }

  getCurrentWeather(param: string | Coordinates): Promise<Weather> {
    return this.fetchAPI(param, 'weather');
  }

  getForecast(param: string | Coordinates): Promise<Forecast> {
    return this.fetchAPI(param, 'forecast');
  }
}
