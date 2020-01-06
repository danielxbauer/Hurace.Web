import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetLiveRace, GetLiveStatistic, GetAllSkiers, SelectLiveRace } from 'src/app/actions';
import { RaceStatisticEntry, RaceDto } from 'src/app/dtos';
import { ApiResource, RunNumber } from 'src/app/models';
import { combineLatest } from 'rxjs/operators';
import { RaceType } from 'src/app/enums';
import { hasSecondRun } from 'src/app/util';

@Component({
    selector: 'app-live-detail',
    templateUrl: './live-detail.component.html',
    styleUrls: ['./live-detail.component.scss']
})
export class LiveDetailComponent implements OnInit {
    public race: ApiResource<RaceDto> = null;

    public runNumber: RunNumber = 1;
    public runNumbers: RunNumber[] = [1, 2];

    public displayedColumns: string[] = ['currentPosition', 'deltaPosition', 'skierId', 'skierCountry', 'time', 'deltaTime']; // TODO: use keyof?
    public statistic$: Observable<ApiResource<RaceStatisticEntry[]>>;

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ) {
        this.statistic$ = this.store.select(s => s.live.statistic);
        this.store.select(s => s.live.selected).subscribe(race => {
            this.race = race;

            if (race.kind === 'Data') {
                this.runNumbers = hasSecondRun(race.data) ? [1, 2] : [1];
                this.runNumber = 1;
            }
        });
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.store.dispatch(new SelectLiveRace(id)).subscribe(() => {
                    this.store.dispatch(new GetLiveStatistic(id, this.runNumber));
                });
        });
    }

    onRunChange(run: RunNumber) {
        if (this.race.kind === 'Data') {
            this.runNumber = run;
            this.store.dispatch(new GetLiveStatistic(this.race.data.id, this.runNumber));
        }
    }
}
