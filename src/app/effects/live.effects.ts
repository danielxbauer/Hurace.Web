import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { RaceService } from '../services/race.service';
import { StatisticService } from '../services/statistic.service';
import { getLiveAllRaces, getLiveAllRacesSuccess, getLiveAllRacesError, getLiveRace, getLiveRaceSuccess, getLiveRaceError, getLiveStatistic, getLiveStatisticSuccess, getLiveStatisticError, selectLiveRace } from '../actions/live.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { RaceState } from '../enums';
import { of } from 'rxjs';

@Injectable()
export class LiveEffects {

    getLiveAllRaces$ = createEffect(() => this.actions$.pipe(
        ofType(getLiveAllRaces),
        mergeMap(() => this.raceService.getByState(RaceState.Running).pipe(
            map(races => {
                races.forEach(r => r.raceDate = new Date(r.raceDate));
                return getLiveAllRacesSuccess({ payload: races });
            }),
            catchError(() => of(getLiveAllRacesError()))
        ))
    ));

    getLiveRace$ = createEffect(() => this.actions$.pipe(
        ofType(getLiveRace),
        mergeMap(action => this.raceService.getById(action.id).pipe(
            map(race => getLiveRaceSuccess({ payload: race })),
            catchError(() => of(getLiveRaceError()))
        ))
    ));

    getLiveStatistic$ = createEffect(() => this.actions$.pipe(
        ofType(getLiveStatistic),
        mergeMap(action => this.statisticService.getRaceStatistic(action.id, action.runNumber, action.sensorAmount).pipe(
            map(raceResults => {
                return getLiveStatisticSuccess({ payload: raceResults });
            }),
            catchError(() => of(getLiveStatisticError()))
        ))
    ));

    selectSkier$ = createEffect(() => this.actions$.pipe(
        ofType(selectLiveRace),
        tap(action => this.router.navigateByUrl(`live/${action.id}`))
    ), { dispatch: false });

    constructor(
        private router: Router,
        private actions$: Actions,
        private raceService: RaceService,
        private statisticService: StatisticService) {
    }
}
