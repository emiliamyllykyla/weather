import { Component, OnInit, Input } from '@angular/core';
import { ForecastList } from 'src/app/Forecast';
import { Custom, Weather } from 'src/app/Weather';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weather!: Weather;
  @Input() custom!: Custom;
  @Input() forecast!: ForecastList;

  constructor() {}

  ngOnInit(): void {}
}
