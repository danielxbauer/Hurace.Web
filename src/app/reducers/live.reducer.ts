import { RaceDto } from '../dtos/race.dto';
import { ApiResource, data, loading, error, empty } from '../models';
import { createReducer, on } from '@ngrx/store';
import { getLiveRace, getLiveRaceSuccess, getLiveRaceError, getLiveStatistic, getLiveStatisticSuccess, getLiveStatisticError, getLiveAllRaces, getLiveAllRacesSuccess, getLiveAllRacesError } from '../actions/live.actions';
import { RaceResultDto } from '../dtos';

export interface LiveState {
    races: ApiResource<RaceDto[]>,
    selected: {
        race: ApiResource<RaceDto>,
        statistic: ApiResource<RaceResultDto[]>
    }
}

const initialState: LiveState = {
    races: empty(),
    selected: {
        race: empty(),
        statistic: empty()
    }
};

const onGetLiveAllRaces = (state: LiveState): LiveState => ({
    ...state,
    races: loading()
});
const onGetLiveAllRacesSuccess = (state: LiveState, races: RaceDto[]): LiveState => ({
    ...state,
    races: data(races),
})
const onGetLiveAllRacesError = (state: LiveState): LiveState => ({
    ...state,
    races: error()
});

const onGetLiveRace = (state: LiveState): LiveState => ({
    ...state,
    selected: {
        race: loading(),
        statistic: empty()
    }
});
const onGetLiveRaceSuccess = (state: LiveState, race: RaceDto): LiveState => ({
    ...state,
    selected: {
        ...state.selected,
        race: data(race)
    }
})
const onGetLiveRaceError = (state: LiveState): LiveState => ({
    ...state,
    selected: {
        ...state.selected,
        race: error()
    }
});

const onGetLiveStatistic = (state: LiveState): LiveState => ({
    ...state,
    selected: {
        ...state.selected,
        statistic: loading()
    }
});
const onGetLiveStatisticSuccess = (state: LiveState, statistic: RaceResultDto[]): LiveState => ({
    ...state,
    selected: {
        ...state.selected,
        statistic: data(statistic)
    }
})
const onGetLiveStatisticError = (state: LiveState): LiveState => ({
    ...state,
    selected: {
        ...state.selected,
        statistic: error()
    }
});

const _liveReducer = createReducer(initialState,
    on(getLiveAllRaces, onGetLiveAllRaces),
    on(getLiveAllRacesSuccess, (state, { payload }) => onGetLiveAllRacesSuccess(state, payload)),
    on(getLiveAllRacesError, onGetLiveAllRacesError),

    on(getLiveRace, onGetLiveRace),
    on(getLiveRaceSuccess, (state, { payload }) => onGetLiveRaceSuccess(state, payload)),
    on(getLiveRaceError, onGetLiveRaceError),

    on(getLiveStatistic, onGetLiveStatistic),
    on(getLiveStatisticSuccess, (state, { payload }) => onGetLiveStatisticSuccess(state, payload)),
    on(getLiveStatisticError, onGetLiveStatisticError),
);

export function liveReducer(state, action) {
    return _liveReducer(state, action);
}
