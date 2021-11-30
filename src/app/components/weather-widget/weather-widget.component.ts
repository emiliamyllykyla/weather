import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from 'src/app/Forecast';
import { CustomWeatherData } from 'src/app/Weather';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() data!: CustomWeatherData;
  @Input() forecast!: Forecast;

  constructor() {}

  ngOnInit(): void {}
}
