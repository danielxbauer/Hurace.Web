import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResource } from 'src/app/models';
import { RaceDto } from 'src/app/dtos';
import { GetAllRaces } from 'src/app/actions';
import { formatGender, formatRaceType } from 'src/app/util';

@Component({
    selector: 'app-race-list',
    templateUrl: './race-list.component.html',
    styleUrls: ['./race-list.component.scss']
})
export class RaceListComponent implements OnInit {
    public races$: Observable<ApiResource<RaceDto[]>>;

    constructor(
        private store: Store
    ) {
        this.races$ = store.select(s => s.race.races);
    }

    ngOnInit() {
        this.store.dispatch(new GetAllRaces());
    }

    public formatRaceType = formatRaceType;
    public formatGender = formatGender;
}
