import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

import { GetRaceById, GetRaceStatistic, GetAllSkiers, SelectRace } from 'src/app/actions';
import { RaceStatisticEntry, RaceDto, SkierDto } from 'src/app/dtos';
import { ApiResource, RunNumber, empty } from 'src/app/models';
import { hasSecondRun } from 'src/app/util';
import { Props } from 'src/app/models/props.model';
import { NavLink } from 'src/app/models/nav-link.model';

@Component({
    selector: 'app-race-detail',
    templateUrl: './race-detail.component.html',
    styleUrls: ['./race-detail.component.scss']
})
export class RaceDetailComponent implements OnInit {
    public race: ApiResource<RaceDto> = null;
    public navLinks: NavLink[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ) {
        store.select(s => s.race.selected).subscribe(race => {
            this.race = race;

            if (race.kind === 'Data') {
                this.navLinks = hasSecondRun(race.data)
                    ? [{ path: '1', label: 'Run 1' }, { path: '2', label: 'Run 2' }]
                    : [{ path: '1', label: 'Run' }]
            }
        });
    }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.store.dispatch(new SelectRace(id));
        });
    }
}
