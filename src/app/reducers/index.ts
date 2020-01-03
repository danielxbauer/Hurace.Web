import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { skierReducer, SkierState } from './skier.reducer';
import { countriesReducer } from './countries.reducer';

export interface State {
    skier: SkierState,
    countryCodes: string[]
}

export const reducers: ActionReducerMap<State> = {
    skier: skierReducer,
    countryCodes: countriesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
