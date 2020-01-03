import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SkierService, CountryService } from './services';
import { Gender } from './enums';
import { getAllSkiers, getAllSkiersError, getAllSkiersSuccess, getAllCountries, getAllCountriesSuccess, getAllCountriesError } from './actions';

@Injectable()
export class AppEffects {

    getAllSkiers$ = createEffect(() => this.actions$.pipe(
        ofType(getAllSkiers),
        mergeMap(() => this.skierService.getAll(Gender.Male)
            .pipe(
                map(skiers =>  {
                    skiers.forEach(s => s.birthDate = new Date(s.birthDate));
                    return getAllSkiersSuccess({ payload: skiers });
                }),
                catchError(() => of(getAllSkiersError))
            ))
    ));

    getAllCountries$ = createEffect(() => this.actions$.pipe(
        ofType(getAllCountries),
        mergeMap(() => this.countryService.getCountryCodes()
            .pipe(
                map(countries => getAllCountriesSuccess({ payload: countries })),
                catchError(() => of(getAllCountriesError))
            ))
    ));

    constructor(
        private actions$: Actions,
        private skierService: SkierService,
        private countryService: CountryService) { }
}
