import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.query) return;
    this.fetchWeather();
    this.fetchForecast();
    this.query = '';
  }
  
  fetchWeather() {
    this.dataService.fetchWeatherData(this.query)?.subscribe({
      next: (data) => {
        this.dataService.setWeatherData(data);
      },
      error: (error) => console.log('Error: ', error),
    });
  }

  fetchForecast() {
    this.dataService.fetchForecastData(this.query)?.subscribe({
      next: (data) => {
        this.dataService.setForecastData(data);
      },
      error: (error) => console.log('Error: ', error),
    });
  }
}
