import { State, Action, StateContext } from '@ngxs/store';
import { empty, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CountryService } from '../services/country.service';
import { GetAllCountries } from '../actions';

type Context = StateContext<CountriesStateModel>;

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
    getAllCountries(context: Context) {
        return this.countryService.getCountryCodes().pipe(
            tap(countries => context.setState(countries)),
            catchError(_ => {
                context.setState([]);
                return of([]);
            })
        );
    }
}
