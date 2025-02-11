import { Component, effect, inject, signal } from '@angular/core';
import { GlobalStore } from '../../stores/global.store';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Countries } from '../../models/countries.model';
import { InformationTableComponent } from '../../components/information-table/information-table.component';
import { InformationChartComponent } from '../../components/information-chart/information-chart.component';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-continent-detail',
  imports: [FormsModule, InformationTableComponent, InformationChartComponent],
  templateUrl: './continent-detail.component.html',
  styleUrl: './continent-detail.component.scss'
})
export class ContinentDetailComponent {
  protected readonly globalStore = inject(GlobalStore);
  private navigateUrl = inject(Router);
  private route = inject(ActivatedRoute);
  private shareService = inject(ShareService);

  public countryName = signal<string>('');
  public continentName = signal<string>('');
  public countriesList = signal<Countries[]>([]);
  public amount = signal<number |undefined>(undefined);

  constructor() {
    effect(() => {
      this.continentName.set(this.shareService.getData().currentRoute || this.route.snapshot.paramMap.get('continent') || '');
      this.countriesList.set(this.updateCountriesList(this.shareService.getData().amount || 1000000000));
    });
  }

  /**
   * return a filtered object continent list
   * @param value: string
   * @returns countries array
   */
  getCountriesFiltered = (value: string = this.countryName()): Countries[] => {
    const countries = this.countriesList();
    return countries.filter((country: Countries) => country.name.common.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
  }

  /**
   * method to back continents mainly view and restore data in shareServices
   */
  backToMainlyView = () => {
    this.shareService.setData({ currentRoute: '', amount: 1000000000 });
    this.navigateUrl.navigate(['/continents']);
  };

  /**
   * get array countries per continent
   * @param amount: number
   * @returns: countries array
   */
  private updateCountriesList = (amount: number): Countries[] => {
    const continent = this.globalStore.getAllContinentsByAmount(amount).find(continent => continent.name === this.continentName());
    return continent ? continent.countries : [];
  }
}
