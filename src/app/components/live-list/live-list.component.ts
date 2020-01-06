import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResource } from 'src/app/models';
import { RaceDto } from 'src/app/dtos';
import { GetLiveAllRaces } from 'src/app/actions';
import { formatGender, formatRaceType } from 'src/app/util';

@Component({
    selector: 'app-live-list',
    templateUrl: './live-list.component.html',
    styleUrls: ['./live-list.component.scss']
})
export class LiveListComponent implements OnInit {
    public races$: Observable<ApiResource<RaceDto[]>>;

    constructor(
        private store: Store
    ) {
        this.races$ = store.select(s => s.live.races);
    }

    ngOnInit() {
        this.store.dispatch(new GetLiveAllRaces());
    }

    public formatRaceType = formatRaceType;
    public formatGender = formatGender;
}
