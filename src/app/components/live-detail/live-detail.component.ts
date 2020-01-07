import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetLiveRace, GetLiveStatistic, GetAllSkiers, SelectLiveRace } from 'src/app/actions';
import { RaceStatisticEntry, RaceDto, SkierDto } from 'src/app/dtos';
import { ApiResource, RunNumber, empty } from 'src/app/models';
import { combineLatest } from 'rxjs/operators';
import { RaceType } from 'src/app/enums';
import { hasSecondRun } from 'src/app/util';
import { Props } from 'src/app/models/props.model';

@Component({
    selector: 'app-live-detail',
    templateUrl: './live-detail.component.html',
    styleUrls: ['./live-detail.component.scss']
})
export class LiveDetailComponent implements OnInit {
    public race: ApiResource<RaceDto> = null;

    public runNumber: RunNumber;
    public runNumbers: RunNumber[];

    public displayedColumns: Props<RaceStatisticEntry>;
    public statistic: ApiResource<RaceStatisticEntry[]> = empty();

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ) {
        this.store.select(s => s.live.statistic).subscribe(s => {
            this.statistic = s;

            if (this.statistic.kind === 'Data') {
                this.displayedColumns = this.getDisplayedColumns(this.runNumber);
            }
        });

        this.store.select(s => s.live.selected).subscribe(race => {
            this.race = race;

            if (race.kind === 'Data') {
                const { runNumber, runNumbers } = this.getRunNumbers(race.data, this.runNumber);
                this.runNumber = runNumber;
                this.runNumbers = runNumbers;
            }
        });
    }

    private getRunNumbers(race: RaceDto, runNumber: RunNumber): { runNumber: RunNumber, runNumbers: RunNumber[] } {
        const runNumbers: RunNumber[] = hasSecondRun(race) ? [1, 2] : [1];
        return runNumbers.includes(runNumber)
            ? { runNumbers, runNumber }
            : { runNumbers, runNumber: 1 };
    }

    private getDisplayedColumns(runNumber: RunNumber): Props<RaceStatisticEntry> {
        return runNumber === 1
            ? ['currentPosition', 'skierId', 'skierCountry', 'time', 'deltaTimeLeadership']
            : ['currentPosition', 'deltaPosition', 'skierId', 'skierCountry', 'time',   'deltaTimeLeadership'];
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
