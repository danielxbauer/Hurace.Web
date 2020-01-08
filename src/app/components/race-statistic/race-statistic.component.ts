import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Props, ApiResource, empty, RunNumber } from 'src/app/models';
import { RaceStatisticEntry } from 'src/app/dtos';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { GetRaceStatistic } from 'src/app/actions';

@Component({
    selector: 'app-race-statistic',
    templateUrl: './race-statistic.component.html',
    styleUrls: ['./race-statistic.component.scss']
})
export class RaceStatisticComponent implements OnInit {
    private runNumber: RunNumber;

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
    }

    ngOnInit() {
        combineLatest(this.route.parent.params, this.route.params).subscribe(values => {
            const id = +values[0]['id'];
            this.runNumber = +values[1]['runNumber'] as RunNumber;

            this.store.dispatch(new GetRaceStatistic(id, this.runNumber));
        });
    }

    private getDisplayedColumns(runNumber: RunNumber): Props<RaceStatisticEntry> {
        return runNumber === 1
            ? ['currentPosition', 'skierId', 'skierCountry', 'time', 'deltaTimeLeadership']
            : ['currentPosition', 'deltaPosition', 'skierId', 'skierCountry', 'time', 'deltaTimeLeadership'];
    }

}
