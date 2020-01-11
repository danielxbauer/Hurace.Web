import { State, Action, StateContext } from '@ngxs/store';
import { empty, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CountryService } from '../services/country.service';
import { GetAllCountries } from '../actions';

type Context = StateContext<CountryStateModel>;

export type CountryStateModel = string[];
const initialState: CountryStateModel = [];

@State<CountryStateModel>({
    name: 'countries',
    defaults: initialState
})
export class CountryState {
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
