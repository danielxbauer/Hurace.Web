import { StateContext, State, Action } from '@ngxs/store';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { RaceDto, RaceStatisticEntry } from '../dtos';
import { ApiResource, empty, loading, data, error } from '../models';
import { RaceService } from '../services/race.service';
import { GetLiveAllRaces, GetLiveRace, GetLiveStatistic } from '../actions';
import { RaceState } from '../enums';
import { StatisticService } from '../services/statistic.service';

type Context = StateContext<LiveStateModel>;

export interface LiveStateModel {
    races: ApiResource<RaceDto[]>,
    selected: ApiResource<RaceDto>,
    statistic: ApiResource<RaceStatisticEntry[]>
}

const initialState: LiveStateModel = {
    races: empty(),
    selected: empty(),
    statistic: empty()
};

@State<LiveStateModel>({
    name: 'live',
    defaults: initialState
})
export class LiveState {
    constructor(
        private raceService: RaceService,
        private statisticService: StatisticService
    ) { }

    @Action(GetLiveAllRaces)
    getLiveAllRaces(context: Context) {
        context.patchState({ races: loading() });

        return this.raceService.getByState(RaceState.Running).pipe(
            map(races => {
                races.forEach(r => r.raceDate = new Date(r.raceDate));
                return races;
            }),
            tap(races => context.patchState({ races: data(races) })),
            catchError(_ => {
                context.patchState({ races: error() })
                return of([]);
            })
        );
    }

    @Action(GetLiveRace)
    getLiveRace(context: Context, action: GetLiveRace) {
        context.patchState({ selected: loading() });

        return this.raceService.getById(action.id).pipe(
            map(race => {
                race.raceDate = new Date(race.raceDate);
                return race;
            }),
            tap(race => context.patchState({ selected: data(race) })),
            catchError(_ => {
                context.patchState({ selected: error() });
                return of([]);
            })
        );
    }

    @Action(GetLiveStatistic)
    getLiveStatistic(context: Context, action: GetLiveStatistic) {
        context.patchState({ statistic: loading() });

        return this.statisticService.getRaceStatistic(action.id, action.runNumber).pipe(
            map(dtos => {
                return dtos as RaceStatisticEntry[]; // TODO:
            }),
            tap(statistic => context.patchState({ statistic: data(statistic) })),
            catchError(_ => {
                context.patchState({ statistic: error() });
                return of([]);
            })
        );
    }
}
