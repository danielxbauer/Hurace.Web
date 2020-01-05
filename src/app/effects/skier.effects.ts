import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { SkierService, } from '../services';
import { getAllSkiers, getAllSkiersError, getAllSkiersSuccess, newSkier, saveSkier, saveSkierError, saveSkierSuccess, getSkierById, getSkierByIdSuccess, getSkierByIdError, selectSkier, removeSkier } from '../actions';
import { Router } from '@angular/router';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class SkierEffects {

    newSkier$ = createEffect(() => this.actions$.pipe(
        ofType(newSkier),
        tap(_ => this.router.navigate(['skiers/0']))
    ), { dispatch: false });

    saveSkier$ = createEffect(() => this.actions$.pipe(
        ofType(saveSkier),
        mergeMap(action => this.skierService.save(action.payload)
            .pipe(
                map(id => saveSkierSuccess({ id })),
                catchError(() => of(saveSkierError()))
            ))
    ));

    saveSkierSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(saveSkierSuccess),
        switchMap(action => [
            getAllSkiers(),
            selectSkier({ id: action.id })
        ])
    ));

    selectSkier$ = createEffect(() => this.actions$.pipe(
        ofType(selectSkier),
        tap(action => this.router.navigateByUrl(`skiers/${action.id}`))
    ), { dispatch: false });

    getAllSkiers$ = createEffect(() => this.actions$.pipe(
        ofType(getAllSkiers),
        mergeMap(() => this.skierService.getAll().pipe(
            map(skiers => {
                skiers.forEach(s => s.birthDate = new Date(s.birthDate));
                return getAllSkiersSuccess({ payload: skiers });
            }),
            catchError(() => of(getAllSkiersError()))
        ))
    ));

    getSkierById$ = createEffect(() => this.actions$.pipe(
        ofType(getSkierById),
        mergeMap(action => this.skierService.getById(action.id).pipe(
            map(skier => getSkierByIdSuccess({ payload: skier })),
            catchError(() => of(getSkierByIdError()))
        ))
    ));

    constructor(
        private router: Router,
        private actions$: Actions,
        private skierService: SkierService) {
    }
}
