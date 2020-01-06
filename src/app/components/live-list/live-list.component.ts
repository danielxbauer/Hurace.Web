import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { ApiResource } from 'src/app/models';
import { RaceDto } from 'src/app/dtos';
import { getLiveAllRaces } from 'src/app/actions/live.actions';
import { formatGender, formatRaceType } from 'src/app/util';

@Component({
    selector: 'app-live-list',
    templateUrl: './live-list.component.html',
    styleUrls: ['./live-list.component.scss']
})
export class LiveListComponent implements OnInit {
    public races$: Observable<ApiResource<RaceDto[]>>;

    constructor(
        private store: Store<State>
    ) {
        this.races$ = store.select(s => s.live.races);
    }

    ngOnInit() {
        this.store.dispatch(getLiveAllRaces());
    }

    public formatRaceType = formatRaceType;
    public formatGender = formatGender;
}
