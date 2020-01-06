import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { getLiveRace } from 'src/app/actions/live.actions';
import { RaceStatisticEntry } from 'src/app/dtos/race-statistic-entry.dto';
import { ApiResource } from 'src/app/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-live-detail',
    templateUrl: './live-detail.component.html',
    styleUrls: ['./live-detail.component.scss']
})
export class LiveDetailComponent implements OnInit {
    public displayedColumns: string[] = ['currentPosition', 'deltaPosition', 'skierId', 'skierCountry', 'time', 'deltaTime']; // TODO: use keyof?
    public statistic$: Observable<ApiResource<RaceStatisticEntry[]>>;

    constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
        this.statistic$ = this.store.select(s => s.live.selected.statistic);
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];

            // this.store.dispatch(getAllSkiers());
            this.store.dispatch(getLiveRace({ id }));
            // this.store.dispatch(getLiveStatistic({ id: id, runNumber: 1 }));
        });
    }
}
