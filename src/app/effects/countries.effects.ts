import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { SkierService, CountryService } from '../services';
import { getAllCountries, getAllCountriesSuccess, getAllCountriesError, } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class CountriesEffects {

    getAllCountries$ = createEffect(() => this.actions$.pipe(
        ofType(getAllCountries),
        mergeMap(() => this.countryService.getCountryCodes()
            .pipe(
                map(countries => getAllCountriesSuccess({ payload: countries })),
                catchError(() => of(getAllCountriesError()))
            ))
    ));

    constructor(
        private router: Router,
        private actions$: Actions,
        private countryService: CountryService) { }
}
