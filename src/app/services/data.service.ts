import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Weather } from '../Weather';
import { Forecast } from '../Forecast';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private weatherData = new BehaviorSubject<Weather | null>(null);
  public weatherData$ = this.weatherData.asObservable();
  private forecastData = new BehaviorSubject<Forecast | null>(null);
  public forecastData$ = this.forecastData.asObservable();

  constructor() {}

  setWeatherData(weather: Weather) {
    this.weatherData.next(weather);
  }
  setForecastData(forecast: Forecast) {
    this.forecastData.next(forecast);
  }
}
