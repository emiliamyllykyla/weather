import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City, Coordinates } from 'src/app/City';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() results: City[] = [];
  @Output('onSubmit') onSubmit = new EventEmitter<Coordinates>();

  constructor() {}

  ngOnInit(): void {}

  // Navigate results using arrow keys or tab
  onKeyDown(e: KeyboardEvent, index: number) {
    e.stopPropagation();
    e.preventDefault();
    const current = document.activeElement;
    const last = this.results.length - 1;

    switch (e.key) {
      case 'ArrowUp':
        (
          (index === 0
            ? current?.parentNode?.lastElementChild
            : current?.previousElementSibling) as HTMLElement
        ).focus();
        break;

      case 'ArrowDown':
        (
          (index === last
            ? current?.parentNode?.firstChild
            : current?.nextElementSibling) as HTMLElement
        ).focus();
        break;

      case 'Tab':
        index === last
          ? (current as HTMLElement).blur()
          : (current?.nextElementSibling as HTMLElement).focus();
        break;

      case 'Enter':
        this.onSubmit.emit({
          lon: this.results[index].lon,
          lat: this.results[index].lat,
        });
        break;
    }
  }
}
