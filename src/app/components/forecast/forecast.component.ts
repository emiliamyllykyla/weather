import { Component, Input, OnInit } from '@angular/core';
import { ForecastList } from 'src/app/Forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  @Input() forecast!: ForecastList;

  constructor() {}

  ngOnInit(): void {}
}
