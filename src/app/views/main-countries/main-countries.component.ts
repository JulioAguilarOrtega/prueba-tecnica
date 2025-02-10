import { Component, computed, inject, SimpleChanges } from '@angular/core';
import { GlobalStore } from '../../stores/global.store';
import { InformationChartComponent } from "../../components/information-chart/information-chart.component";

@Component({
  selector: 'app-main-countries',
  imports: [InformationChartComponent],
  templateUrl: './main-countries.component.html',
  styleUrl: './main-countries.component.scss'
})
export class MainCountriesComponent {
  globalStore = inject(GlobalStore);
}
