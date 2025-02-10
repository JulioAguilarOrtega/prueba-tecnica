import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/continents', pathMatch: 'full' },
    {
        path: 'continents', loadComponent: () => import('./views/main-countries/main-countries.component').then(
            (m) => m.MainCountriesComponent
        )
    },
    {
        path: 'continent-detail/:continent', loadComponent: () => import('./views/continent-detail/continent-detail.component').then(
            (m) => m.ContinentDetailComponent
        )
    }
];