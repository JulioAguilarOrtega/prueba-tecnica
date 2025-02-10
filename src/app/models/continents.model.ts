import { Countries } from "./countries.model";

export interface Continents {
    name: string;
    countries: Countries[];
    totalPopulation: number;
}