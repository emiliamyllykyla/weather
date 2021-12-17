import { Component, OnInit } from '@angular/core';
import { Forecast, ForecastList } from 'src/app/Forecast';
import { DataService } from 'src/app/services/data.service';
import { Weather, Custom } from 'src/app/Weather';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  weather!: Weather | null;
  custom!: Custom | null;
  forecast!: ForecastList | null;

  constructor(private dataService: DataService) {
    dataService.weatherData$.subscribe((weatherData) => {
      this.weather = weatherData;
      this.custom = this.makeCustom(weatherData);
    });
    dataService.forecastData$.subscribe(
      (fcData) => (this.forecast = this.makeForecastList(fcData))
    );
  }

  ngOnInit(): void {}

  // WEATHER: Weather today

  // Additional data to display time correctly,
  // local time in the location in question.
  makeCustom(weather: Weather | null): Custom | null {
    return !weather
      ? null
      : {
          time: this.makeDateTime(weather.timezone),
          timezoneStr: this.makeTimezoneStr(weather.timezone),
          sunriseLocaltime: this.makeDateTime(
            weather.timezone,
            weather.sys.sunrise
          ),
          sunsetLocaltime: this.makeDateTime(
            weather.timezone,
            weather.sys.sunset
          ),
        };
  }

  // Getting around how Date object works:
  // Convert a given time so that the browser will display
  // it as is the local time in the queried city.
  makeDateTime(
    timezoneOffset: number | null,
    time?: number | null
  ): Date | null {
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
  makeTimezoneStr(timezoneOffset: number | null): string | null {
    if (timezoneOffset !== 0 && !timezoneOffset) return null;
    const seconds = timezoneOffset;
    const hours = Math.abs(Math.floor(seconds / 3600));
    const mins = Math.abs(Math.floor((seconds % 3600) / 60));
    return `${seconds < 0 ? '-' : '+'}${hours < 10 ? '0' + hours : hours}:${
      mins < 10 ? '0' + mins : mins
    }`;
  }

  // FORECAST: Weather for the following 5 days every 3 hours

  // Make a list where, for each day, include only the
  // forecast for between 12:00-14:00 (local time of the city in question).
  makeForecastList(fcData: Forecast | null): ForecastList | null {
    if (!fcData) return null;
    const timezoneOffset = fcData.city.timezone;
    // Convert timezoneOffset (seconds) to hours
    const timeoffset = timezoneOffset / 3600;
    return fcData.list.filter((item) => {
      const dt = new Date(item.dt * 1000);
      // Check if it's noon
      const h = dt.getUTCHours() + timeoffset;
      const time = h < 0 ? 24 + h : h;
      const isNoon = 12 <= time && time <= 14;
      // Check that it's not current day
      const isNotCurrentDay = dt.getDate() !== new Date().getDate();
      return isNoon && isNotCurrentDay;
    });
  }
}
