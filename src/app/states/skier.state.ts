import { State, Action, StateContext, Select } from '@ngxs/store';
import { of } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';

import { ApiResource, empty, loading, data, error } from '../models';
import { SkierDto } from '../dtos';
import { SkierService } from '../services/skier.service';
import { GetAllSkiers, GetSkierById, SaveSkier, RemoveSkier } from '../actions';

type Context = StateContext<SkierStateModel>;

export interface SkierStateModel {
    all: ApiResource<SkierDto[]>,
    selected: ApiResource<SkierDto>
}
const initialState: SkierStateModel = {
    all: empty(),
    selected: empty()
};

@State<SkierStateModel>({
    name: 'skier',
    defaults: initialState
})
export class SkierState {
    constructor(
        private skierService: SkierService
    ) { }

    @Action(GetAllSkiers)
    getAllSkier(context: Context) {
        context.patchState({ all: loading() });

        return this.skierService.getAll().pipe(
            map(skiers => {
                skiers.forEach(s => s.birthDate = new Date(s.birthDate));
                return skiers;
            }),
            tap(skiers => context.patchState({ all: data(skiers) })),
            catchError(_ => {
                context.patchState({ all: error() })
                return of([]);
            })
        );
    }

    @Action(GetSkierById)
    getSkierById(context: Context, action: GetSkierById) {
        context.patchState({ selected: loading() })

        return this.skierService.getById(action.id).pipe(
            map(skier => {
                skier.birthDate = new Date(skier.birthDate);
                return skier;
            }),
            tap(skier => context.patchState({ selected: data(skier) })),
            catchError(_ => {
                context.patchState({ selected: error() });
                return of([]);
            })
        );
    }

    @Action(SaveSkier)
    saveSkier(context: Context, action: SaveSkier) {
        context.patchState({ selected: loading() });

        return this.skierService.save(action.skier).pipe(
            tap(() => context.patchState({ selected: empty() })),
            mergeMap(id => [
                context.dispatch(new GetAllSkiers()),
                context.dispatch(new GetSkierById(id))
            ]),
            catchError(_ => {
                context.patchState({ selected: error() });
                return of([]);
            })
        );
    }

    @Action(RemoveSkier)
    removeSkier(context: Context, action: RemoveSkier) {
        context.patchState({ selected: loading() });

        return this.skierService.remove(action.id).pipe(
            tap(() => context.patchState({ selected: empty() })),
            mergeMap(id => [
                context.dispatch(new GetAllSkiers())
            ]),
            catchError(_ => {
                context.patchState({ selected: error() });
                return of([]);
            })
        );
    }
}
