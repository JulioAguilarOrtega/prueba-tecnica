import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalStore } from '../../stores/global.store';
import { ShareService } from '../../services/share.service';
import { FormsModule } from '@angular/forms';
import { Continents } from '../../models/continents.model';

@Component({
  selector: 'app-countries-nav',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './countries-nav.component.html',
  styleUrl: './countries-nav.component.scss'
})
export class CountriesNavComponent {
  readonly globalStore = inject(GlobalStore); // get signal store from globalStore
  shareService = inject(ShareService);
  countriesList = signal<Continents[]>(this.globalStore.continents());
  amount = signal<number | undefined>(undefined);
  name = signal<string>('');

  constructor() {
    effect(() => {
      this.amount.set(this.shareService.getData().amount);
      this.name.set(this.shareService.getData().currentRoute);
      this.countriesList.set(this.globalStore.getAllContinentsByAmount(this.amount()).filter(continent => continent.countries.length > 0));
    });
  }

  /**
   * send data to signal service
   * @param name: string
   */
  sendNameParams = (name: string) => {
    this.name.set(name);
    this.shareService.setData({ currentRoute: name, amount: this.amount() });
  }

}
