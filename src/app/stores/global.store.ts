import { inject, InjectionToken } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { ContinentsService } from "../services/continents.service";
import { lastValueFrom } from "rxjs";
import { Continents } from "../models/continents.model";

type StoreState = {
    continents: Continents[],
    worldPopulation: number
};

const initialState: StoreState = {
    continents: [],
    worldPopulation: 0
};

const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
    factory: () => initialState
});

export const GlobalStore = signalStore({ providedIn: 'root' },
    withState(() => inject(STORE_STATE)),
    withMethods((store) => ({
        getAllContinentsByAmount(amount: number = 100000000000) {
            const totalContinentsAndCountries = store.continents().map(continent => {
                const filteredCountries = continent.countries.filter(country => amount >= country.population && amount >= 0);
                return {
                    ...continent,
                    countries: filteredCountries
                };
            });
            return totalContinentsAndCountries;
        }
    })),
    withHooks({
        async onInit(store, continentsService = inject(ContinentsService)) {
            const continents: Continents[] = await lastValueFrom(continentsService.getAllContinents());
            let worldPopulation = 0;
            continents.forEach((continent) => worldPopulation += continent.totalPopulation)
            patchState(store, { continents, worldPopulation });
        }
    })
)