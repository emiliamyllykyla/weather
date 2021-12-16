import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { WeatherService } from 'src/app/services/weather.service';
import { CitiesService } from 'src/app/services/cities.service';
import { City, Coordinates } from 'src/app/City';

import { FormControl } from '@angular/forms';
import { debounceTime, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  search = new FormControl('');
  results: City[] = [];

  constructor(
    private dataService: DataService,
    private weatherService: WeatherService,
    private citiesService: CitiesService
  ) {}

  ngOnInit(): void {
    this.subscription = this.search.valueChanges
      .pipe(
        debounceTime(400),
        switchMap((res) => this.citiesService.fetchCities(res))
      )
      .subscribe(
        (cities) =>
          (this.results = cities.filter(
            (city: City) => city.class === 'boundary' || city.class === 'place'
          ))
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(coord?: Coordinates) {
    if (!this.search.value) return;
    this.results = [];
    const param = coord || this.search.value;
    Promise.all([
      this.weatherService.getCurrentWeather(param),
      this.weatherService.getForecast(param),
    ])
      .then(([weather, forecast]) => {
        if (weather.cod !== 200) {
          throw weather;
        } else if (forecast.cod !== '200') {
          throw forecast;
        }
        this.dataService.setWeatherData(weather);
        this.dataService.setForecastData(forecast);
      })
      .catch((error) => {
        const str = error.message;
        const cap = str.charAt(0).toUpperCase() + str.slice(1);
        const msg = `Error ${error.cod}: ${cap}`;
        console.log(msg);
        alert(msg);
      });
    this.search.setValue('');
  }
}
