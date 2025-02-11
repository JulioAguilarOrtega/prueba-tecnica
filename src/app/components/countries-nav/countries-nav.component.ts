import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
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
  // inject services
  readonly globalStore = inject(GlobalStore); // get signal store from globalStore
  shareService = inject(ShareService); // inject service ShareService
  private route = inject(ActivatedRoute);

  //initialize signals
  countriesList = signal<Continents[]>(this.globalStore.continents());
  amount = signal<number | undefined>(undefined);
  name = signal<string>('');

  constructor() {
    effect(() => {
      this.name.set(this.shareService.getData().currentRoute);
      if(this.amount()) {
        this.countriesList.set(this.globalStore.getAllContinentsByAmount(this.amount()).filter(continent => continent.countries.length > 0));
      }else {
        this.countriesList.set(this.globalStore.continents());
      }
    });
  }

  /**
   * dispatch data to signal service
   * @param name: string
   */
  sendNameParams = (name: string) => {
    this.name.set(name);
    this.shareService.setData({ currentRoute: name, amount: this.amount() });
  }


  /**
     * method that prevent data entry diffent than numbers
     * @param event
     */
  onKeyDown = (event: KeyboardEvent): void => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onKeyUp = (): void => {
    this.shareService.setData({ currentRoute: '', amount: this.amount() });
  }
}
