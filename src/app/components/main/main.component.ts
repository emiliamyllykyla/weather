import { Component, OnInit } from '@angular/core';
import { FcListItem, Forecast } from 'src/app/Forecast';
import { DataService } from 'src/app/services/data.service';
import { Weather, CustomWeatherData } from 'src/app/Weather';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  data!: CustomWeatherData | null;
  forecast!: Forecast | null;

  constructor(private dataService: DataService) {
    dataService.weatherData$.subscribe(
      (weatherData) => (this.data = this.makeWeatherData(weatherData))
    );
    dataService.forecastData$.subscribe(
      (fcData) => (this.forecast = this.makeForecastData(fcData))
    );
  }

  ngOnInit(): void {}

  // WEATHER: Weather today

  // Additional data to display time correctly,
  // local time in the location in question.
  makeWeatherData(data: Weather | null) {
    if (!data) return null;
    return {
      ...data,
      time: this.makeDateTime(data.timezone),
      timezoneStr: this.makeTimezoneStr(data.timezone),
      sys: {
        ...data.sys,
        sunriseLocaltime: this.makeDateTime(data.timezone, data.sys.sunrise),
        sunsetLocaltime: this.makeDateTime(data.timezone, data.sys.sunset),
      },
    };
  }

  // Getting around how Date object works:
  // Convert a given time so that the browser will display
  // it as is the local time in the queried city.
  makeDateTime(timezoneOffset: number | null, time?: number | null) {
    if (timezoneOffset !== 0 && !timezoneOffset) return null;
    let d = time ? new Date(time * 1000) : new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let targetTime = utc + 1000 * timezoneOffset;
    let nd = new Date(targetTime);
    return nd;
  }

  // E.g. +02:00
  makeTimezoneStr(timezoneOffset: number | null) {
    if (timezoneOffset !== 0 && !timezoneOffset) return null;
    const seconds = timezoneOffset;
    const hours = Math.abs(Math.floor(seconds / 3600));
    const mins = Math.abs(Math.floor((seconds % 3600) / 60));
    return `${seconds < 0 ? '-' : '+'}${hours < 10 ? '0' + hours : hours}:${
      mins < 10 ? '0' + mins : mins
    }`;
  }

  // FORECAST: Weather for the following 5 days every 3 hours

  makeForecastData(fcData: Forecast | null) {
    if (!fcData) return null;
    return {
      ...fcData,
      list: this.makeCustomForecastList(fcData.list, fcData.city.timezone),
    };
  }

  // Make a new list where, for each day, include only the
  // forecast for between 12:00-14:00
  // (local time of the city in question).
  makeCustomForecastList(list: FcListItem[], timezoneOffset: number) {
    // Convert timezoneOffset (seconds) to hours
    const timeoffset = timezoneOffset / 3600;
    return list.filter((item) => {
      const dt = new Date(item.dt * 1000);
      // Check time
      const h = dt.getUTCHours() + timeoffset;
      const time = h < 0 ? 24 + h : h;
      const isNoon = 12 <= time && time <= 14;
      // Check that it's not current day
      const isNotCurrentDay = dt.getDate() !== new Date().getDate();
      return isNoon && isNotCurrentDay;
    });
  }
}
