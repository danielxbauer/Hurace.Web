import { createAction, createReducer, props } from '@ngrx/store';
import { hasId, hasData } from '../util';
import { RunNumber } from '../models';
import { RaceStatisticEntry, RaceDto } from '../dtos';

export const getLiveAllRaces = createAction('[Live] GetRaces');
export const getLiveAllRacesSuccess = createAction('[Live] GetRaces Success', hasData<RaceDto[]>());
export const getLiveAllRacesError = createAction('[Live] GetRaces Error');

export const getLiveRace = createAction('[Live] GetRace', hasId);
export const getLiveRaceSuccess = createAction('[Live] GetRace Success', hasData<RaceDto>());
export const getLiveRaceError = createAction('[Live] GetRace Error');

export const getLiveStatistic = createAction('[Live] GetStatistic', props<{ id: number, runNumber: RunNumber }>());
export const getLiveStatisticSuccess = createAction('[Live] GetStatistic Success', hasData<RaceStatisticEntry[]>());
export const getLiveStatisticError = createAction('[Live] GetStatistic Error');

export const selectLiveRace = createAction('[Live] Select', hasId);
