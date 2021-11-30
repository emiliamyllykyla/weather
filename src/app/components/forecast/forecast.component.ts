import { Component, Input, OnInit } from '@angular/core';
import { FcListItem } from 'src/app/Forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  @Input() list!: FcListItem[];

  constructor() {}

  ngOnInit(): void {}
}
