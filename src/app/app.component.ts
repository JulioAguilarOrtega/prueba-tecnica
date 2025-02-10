import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountriesNavComponent } from './components/countries-nav/countries-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountriesNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prueba-tecnica-julio';
}
