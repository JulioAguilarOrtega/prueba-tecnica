import { Component, input } from '@angular/core';
import { Countries } from '../../models/countries.model';

@Component({
  selector: 'app-information-table',
  imports: [],
  templateUrl: './information-table.component.html',
  styleUrl: './information-table.component.scss',
})
export class InformationTableComponent {
  tableElement = input<Countries[]>([]);
}
