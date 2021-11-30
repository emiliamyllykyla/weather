import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherService } from './weather.service';
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

  constructor(private weatherService: WeatherService) {}

  setWeatherData(weather: Weather) {
    this.weatherData.next(weather);
  }
  setForecastData(forecast: Forecast) {
    this.forecastData.next(forecast);
  }

  fetchWeatherData(query: string) {
    return this.weatherService.getCurrentWeather(query);
  }
  fetchForecastData(query: string) {
    return this.weatherService.getForecast(query);
  }
}
