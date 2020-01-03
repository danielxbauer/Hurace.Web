import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

import { SkierDto } from '../dtos';
import { getAllSkiers, getSkierById, getAllSkiersSuccess } from '../actions';
import { Gender } from '../enums';

export interface SkierState {
    all: SkierDto[],
    selected: SkierDto
}

export const initialState: SkierState = {
    all: [],
    selected: null
};

const newSkier: SkierDto = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: Gender.Male,
    countryCode: null,
    birthDate: null,
    isActive: true,
    image: null
};

const _skierReducer = createReducer(initialState,
    on(getAllSkiersSuccess, (state, { payload }) => ({
        ...state,
        all: payload
    })),
    on(getSkierById, (state, { id }) => {
        const skier = id !== 0
            ? state.all.find(s => s.id === id)
            : newSkier;

        console.log(skier);

        return {
            ...state,
            selected: skier
        };
    })
);

export function skierReducer(state, action) {
    return _skierReducer(state, action);
}
