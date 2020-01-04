import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { SkierService, CountryService } from './services';
import { Gender } from './enums';
import { getAllSkiers, getAllSkiersError, getAllSkiersSuccess, getAllCountries, getAllCountriesSuccess, getAllCountriesError, newSkier, saveSkier, saveSkierError, saveSkierSuccess, getSkierById, getSkierByIdSuccess, getSkierByIdError } from './actions';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {

    newSkier$ = createEffect(() => this.actions$.pipe(
        ofType(newSkier),
        tap(_ => this.router.navigate(['skiers/0']))
    ), { dispatch: false });

    saveSkier$ = createEffect(() => this.actions$.pipe(
        ofType(saveSkier),
        mergeMap(action => this.skierService.save(action.skier)
            .pipe(
                map(_ => saveSkierSuccess()),
                catchError(() => of(saveSkierError))
            ))
    ));

    saveSkierSuccess = createEffect(() => this.actions$.pipe(
        ofType(saveSkierSuccess),
        tap(_ => this.router.navigate(['skiers/0']))
    ), { dispatch: false });

    getAllSkiers$ = createEffect(() => this.actions$.pipe(
        ofType(getAllSkiers),
        mergeMap(() => this.skierService.getAll().pipe(
            map(skiers => {
                skiers.forEach(s => s.birthDate = new Date(s.birthDate));
                return getAllSkiersSuccess({ payload: skiers });
            }),
            catchError(() => of(getAllSkiersError))
        ))
    ));

    getSkierById$ = createEffect(() => this.actions$.pipe(
        ofType(getSkierById),
        mergeMap(action => this.skierService.getById(action.id).pipe( // TODO: handle id == 0
            map(skier => getSkierByIdSuccess({ skier }),
            catchError(() => of(getSkierByIdError)))
        ))
    ))

    getAllCountries$ = createEffect(() => this.actions$.pipe(
        ofType(getAllCountries),
        mergeMap(() => this.countryService.getCountryCodes()
            .pipe(
                map(countries => getAllCountriesSuccess({ payload: countries })),
                catchError(() => of(getAllCountriesError))
            ))
    ));

    constructor(
        private router: Router,
        private actions$: Actions,
        private skierService: SkierService,
        private countryService: CountryService) { }
}
