import { Component, OnInit } from '@angular/core';
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
    Promise.all([
      this.weatherService.getCurrentWeather(this.query),
      this.weatherService.getForecast(this.query),
    ])
      .then(([res1, res2]) => {
        if (res1.cod !== 200) {
          throw res1;
        } else if (res2.cod !== '200') {
          throw res2;
        }
        this.dataService.setWeatherData(res1);
        this.dataService.setForecastData(res2);
      })
      .catch((error) => {
        const str = error.message;
        const cap = str.charAt(0).toUpperCase() + str.slice(1);
        const msg = `Error ${error.cod}: ${cap}`;
        console.log(msg);
        alert(msg);
      });
    this.query = '';
  }
}
