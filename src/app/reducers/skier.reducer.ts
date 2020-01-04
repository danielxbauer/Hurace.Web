import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

import { SkierDto } from '../dtos';
import { getAllSkiers, getSkierById, getAllSkiersSuccess, getSkierByIdSuccess } from '../actions';
import { Gender } from '../enums';

export interface SkierState {
    all: SkierDto[],
    selected: SkierDto
}

export const initialState: SkierState = {
    all: [],
    selected: null
};

const _skierReducer = createReducer(initialState,
    on(getAllSkiersSuccess, (state, { payload }) => ({
        ...state,
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
