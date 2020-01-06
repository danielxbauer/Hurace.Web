import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { getLiveRace, getLiveStatistic } from 'src/app/actions/live.actions';

@Component({
    selector: 'app-live-detail',
    templateUrl: './live-detail.component.html',
    styleUrls: ['./live-detail.component.scss']
})
export class LiveDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
        store.select(s => s.live.selected)
            .subscribe(race => {
                // if (race.race.kind === 'Data') {
                //     const data = race.race.data;
                //     this.store.dispatch(getLiveStatistic({ id: data.id, runNumber: 1,sensorAmount: data.sensorAmount }));
                // }

                console.log(race);
            });
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.store.dispatch(getLiveRace({ id }));
            this.store.dispatch(getLiveStatistic({ id: id, runNumber: 1 }));
        });
    }

}
