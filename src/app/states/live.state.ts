import { StateContext, State, Action, Store, Selector } from '@ngxs/store';
import { map, tap, catchError } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';

import { RaceDto, RaceStatisticEntry, RaceStatisticEntryDto, SkierDto } from '../dtos';
import { ApiResource, empty, loading, data, error } from '../models';
import { RaceService } from '../services/race.service';
import { GetLiveAllRaces, GetLiveRace, GetLiveStatistic, SelectLiveRace, GetAllSkiers } from '../actions';
import { RaceState } from '../enums';
import { StatisticService } from '../services/statistic.service';
import { SkierState } from './skier.state';
import { fullName, mapStatisticDto } from '../util';

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
        private store: Store,
        private raceService: RaceService,
        private statisticService: StatisticService
    ) { }

    @Action(SelectLiveRace)
    selectLiveRace(context: Context, action: SelectLiveRace) {
        const a = context.dispatch(new GetLiveRace(action.id));
        const b = context.dispatch(new GetAllSkiers());

        return combineLatest(a, b);
    }

    @Action(GetLiveAllRaces)
    getLiveAllRaces(context: Context) {
        context.patchState({ races: loading() });

        return this.raceService.getByState(RaceState.Running).pipe(
            map(races => {
                races.forEach(r => r.raceDate = new Date(r.raceDate));
                return races;
            }),
            tap(races => context.patchState({ races: data(races) })),
            catchError(e => {
                context.patchState({ races: error(e) })
                return of([]);
            })
        );
    }

    @Action(GetLiveRace)
    getLiveRace(context: Context, action: GetLiveRace) {
        // Alread loaded
        const state = context.getState();
        if (state.races.kind === 'Data') {
            const race = state.races.data.find(s => s.id == action.id);
            context.patchState({ selected: data(race) });
            return;
        }

        // Load from api
        context.patchState({ selected: loading() });
        return this.raceService.getById(action.id).pipe(
            map(race => {
                race.raceDate = new Date(race.raceDate);
                return race;
            }),
            tap(race => context.patchState({ selected: data(race) })),
            catchError(e => {
                context.patchState({ selected: error(e) });
                return of([]);
            })
        );
    }

    @Action(GetLiveStatistic)
    getLiveStatistic(context: Context, action: GetLiveStatistic) {
        context.patchState({ statistic: loading() });

        return this.statisticService.getRaceStatistic(action.id, action.runNumber).pipe(
            map(dtos => {
                const skier = this.store.selectSnapshot(SkierState.getSkier);
                if (skier.kind != 'Data') {
                    throw Error('Skiers not loaded');
                }

                return dtos.map(dto => mapStatisticDto(dto, skier.data));
            }),
            tap(statistic => context.patchState({ statistic: data(statistic) })),
            catchError(e => {
                context.patchState({ statistic: error(e) }); // TODO: message?!
                return of([]);
            })
        );
    }
}
