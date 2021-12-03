import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query!: string;

  constructor(
    private dataService: DataService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.query) return;
    forkJoin({
      response1: this.weatherService.getCurrentWeather(this.query),
      response2: this.weatherService.getForecast(this.query),
    }).subscribe({
      next: ({ response1, response2 }) => {
        this.dataService.setWeatherData(response1);
        this.dataService.setForecastData(response2);
      },
      error: (error) => {
        console.log('Error: ', error);
        const str = error.error.message;
        const message = str.charAt(0).toUpperCase() + str.slice(1);
        alert('Error ' + error.error.cod + ': ' + message + ' :(');
      },
    });
    this.query = '';
  }
}
