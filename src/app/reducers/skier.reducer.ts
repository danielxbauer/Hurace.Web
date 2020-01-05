import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

import { SkierDto } from '../dtos';
import { getAllSkiersSuccess, getSkierByIdSuccess, getAllSkiers, getAllSkiersError, getSkierByIdError, getSkierById } from '../actions';
import { ApiResource, data, loading, error, empty } from '../models';

export interface SkierState {
    all: ApiResource<SkierDto[]>,
    selected: ApiResource<SkierDto>
}

const initialState: SkierState = {
    all: empty(),
    selected: empty()
};

const onGetAllSkiers = (state: SkierState): SkierState => ({
    ...state,
    all: loading()
});
const onGetAllSkiersSuccess = (state: SkierState, skiers: SkierDto[]): SkierState => ({
    ...state,
    all: data(skiers),
})
const onGetAllSkiersError = (state: SkierState): SkierState => ({
    ...state,
    all: error()
});

const onGetSkierById = (state: SkierState): SkierState => ({
    ...state,
    selected: loading()
});
const onGetSkierByIdSuccess = (state: SkierState, skier: SkierDto): SkierState => ({
    ...state,
    selected: data(skier)
});
const onGetSkierByIdError = (state: SkierState): SkierState => ({
    ...state,
    selected: error()
});

const _skierReducer = createReducer(initialState,
    on(getAllSkiers, onGetAllSkiers),
    on(getAllSkiersSuccess, (state, { payload }) => onGetAllSkiersSuccess(state, payload)),
    on(getAllSkiersError, onGetAllSkiersError),

    on(getSkierById, onGetSkierById),
    on(getSkierByIdSuccess, (state, { payload }) => onGetSkierByIdSuccess(state, payload)),
    on(getSkierByIdError, onGetSkierByIdError)
);

export function skierReducer(state, action) {
    return _skierReducer(state, action);
}
