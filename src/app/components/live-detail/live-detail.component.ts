import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetLiveRace, GetLiveStatistic } from 'src/app/actions';
import { RaceStatisticEntry } from 'src/app/dtos';
import { ApiResource } from 'src/app/models';

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
        private store: Store
    ) {
        this.statistic$ = this.store.select(s => s.live.statistic);
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];

            // this.store.dispatch(getAllSkiers()); TODO:
            this.store.dispatch(new GetLiveRace(id));
            this.store.dispatch(new GetLiveStatistic(id, 1));
        });
    }
}
