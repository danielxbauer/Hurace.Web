import { createReducer, on } from '@ngrx/store';
import { getAllCountriesSuccess, getAllCountriesError } from '../actions';

export const initialState: string[] = [];

const _countriesReducer = createReducer(initialState,
    on(getAllCountriesSuccess, (state, { payload }) => {
        return payload;
    }),
    on(getAllCountriesError, state => {
        console.log('error');
        return state;
    })
);

export function countriesReducer(state, action) {
  return _countriesReducer(state, action);
}