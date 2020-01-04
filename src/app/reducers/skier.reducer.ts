import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

import { SkierDto } from '../dtos';
import { getAllSkiersSuccess, getSkierByIdSuccess, getAllSkiers, getAllSkiersError } from '../actions';

export interface SkierState {
    isLoading: boolean,
    isError: false,
    all: SkierDto[],
    selected: SkierDto
}

export const initialState: SkierState = {
    isLoading: false,
    isError: false,
    all: [],
    selected: null
};

const _skierReducer = createReducer(initialState,
    on(getAllSkiers, state => ({
        ...state,
        isLoading: true,
        isError: false
    })),

    on(getAllSkiersSuccess, (state, { payload }) => ({
        ...state,
        isLoading: false,
        all: payload
    })),

    on(getAllSkiersError, state => ({
        ...state,
        isLoading: false,
        isError: true
    })),

    on(getSkierByIdSuccess, (state, { skier }) => ({
        ...state,
        selected: skier
    }))
);

export function skierReducer(state, action) {
    return _skierReducer(state, action);
}
