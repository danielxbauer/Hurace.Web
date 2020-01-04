import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

import { SkierDto } from '../dtos';
import { getAllSkiersSuccess, getSkierByIdSuccess, getAllSkiers } from '../actions';

export interface SkierState {
    isLoading: boolean,
    all: SkierDto[],
    selected: SkierDto
}

export const initialState: SkierState = {
    isLoading: false,
    all: [],
    selected: null
};

const _skierReducer = createReducer(initialState,
    on(getAllSkiers, state => ({
        ...state,
        isLoading: true
    })),
    on(getAllSkiersSuccess, (state, { payload }) => ({
        ...state,
        isLoading: false,
        all: payload
    })),
    on(getSkierByIdSuccess, (state, { skier }) => ({
        ...state,
        selected: skier
    }))
);

export function skierReducer(state, action) {
    return _skierReducer(state, action);
}
