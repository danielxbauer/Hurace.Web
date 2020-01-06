import { State, Action, StateContext } from '@ngxs/store';
import { empty, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CountryService } from '../services/country.service';
import { GetAllCountries } from '../actions';

export type CountriesStateModel = string[];
const initialState: CountriesStateModel = [];

@State<CountriesStateModel>({
    name: 'countries',
    defaults: initialState
})
export class CountriesState {
    constructor(
        private countryService: CountryService
    ) { }

    @Action(GetAllCountries)
    getAllCountries({ setState }: StateContext<CountriesStateModel>) {
        return this.countryService.getCountryCodes().pipe(
            tap(countries => setState(countries)),
            catchError(_ => {
                setState([]);
                return of([]);
            })
        );
    }
}
