import { StateContext, State, Action } from '@ngxs/store';
import { ApiResource, empty, loading, data, error } from '../models';
import { RaceDto } from '../dtos';
import { RaceService } from '../services/race.service';
import { GetSeasons } from '../actions/season.actions';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

type Context = StateContext<SeasonStateModel>;

export interface SeasonStateModel {
    races: ApiResource<RaceDto[]>
}

const initialState: SeasonStateModel = {
    races: empty()
};

@State<SeasonStateModel>({
    name: 'season',
    defaults: initialState
})
export class SeasonState {
    constructor(
        private raceService: RaceService
    ) { }

    @Action(GetSeasons)
    getSeasons(context: Context) {
        context.patchState({ races: loading() });

        return this.raceService.getAll().pipe(
            map(races => {
                races.forEach(r => r.raceDate = new Date(r.raceDate));
                return races;
            }),
            tap(races => context.patchState({ races: data(races) })),
            catchError(e => {
                context.patchState({ races: error(e) });
                return of(e);
            })
        );
    }
}
