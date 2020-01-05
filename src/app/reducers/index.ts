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
import { LiveState, liveReducer } from './live.reducer';

export interface State {
    skier: SkierState,
    live: LiveState,
    countryCodes: string[]
}

export const reducers: ActionReducerMap<State> = {
    skier: skierReducer,
    live: liveReducer,
    countryCodes: countriesReducer
};

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log(action);
        // console.log(state);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
