import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetRaceById, GetRaceStatistic, GetAllSkiers, SelectRace } from 'src/app/actions';
import { RaceStatisticEntry, RaceDto, SkierDto } from 'src/app/dtos';
import { ApiResource, RunNumber, empty } from 'src/app/models';
import { hasSecondRun } from 'src/app/util';
import { Props } from 'src/app/models/props.model';

@Component({
    selector: 'app-race-detail',
    templateUrl: './race-detail.component.html',
    styleUrls: ['./race-detail.component.scss']
})
export class RaceDetailComponent implements OnInit {
    public race: ApiResource<RaceDto> = null;

    public runNumber: RunNumber;
    public runNumbers: RunNumber[];

    public displayedColumns: Props<RaceStatisticEntry>;
    public statistic: ApiResource<RaceStatisticEntry[]> = empty();

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ) {
        this.store.select(s => s.race.statistic).subscribe(s => {
            this.statistic = s;

            if (this.statistic.kind === 'Data') {
                this.displayedColumns = this.getDisplayedColumns(this.runNumber);
            }
        });

        this.store.select(s => s.race.selected).subscribe(race => {
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
            : ['currentPosition', 'deltaPosition', 'skierId', 'skierCountry', 'time', 'deltaTimeLeadership'];
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.store.dispatch(new SelectRace(id)).subscribe(() => {
                this.store.dispatch(new GetRaceStatistic(id, this.runNumber));
            });
        });
    }

    onRunChange(run: RunNumber) {
        if (this.race.kind === 'Data') {
            this.runNumber = run;
            this.store.dispatch(new GetRaceStatistic(this.race.data.id, this.runNumber));
        }
    }
}
