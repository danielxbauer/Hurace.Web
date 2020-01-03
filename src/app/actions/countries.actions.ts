import { createAction, props } from '@ngrx/store';

export const getAllCountries = createAction('[Countries] GetAll');
export const getAllCountriesSuccess = createAction('[Countries] GetAll Success', props<{ payload: string[] }>());
export const getAllCountriesError = createAction('[Countries] GetAll Error');

