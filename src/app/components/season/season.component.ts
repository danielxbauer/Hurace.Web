import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetSeasons } from 'src/app/actions/season.actions';
import { RaceDto } from 'src/app/dtos';
import { ApiResource } from 'src/app/models';
import { RaceType } from 'src/app/enums';
import { formatRaceType, formatGender } from 'src/app/util';

interface RaceGroup {
    raceType: RaceType,
    data: RaceDto[]
}

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
    public races: ApiResource<RaceDto[]>;
    public displayedColumns: string[] = ['name', 'raceDate', 'gender'];
    public groups: RaceGroup[];

    constructor(
        private store: Store
    ) {
        this.store.select(s => s.season.races).subscribe((races: ApiResource<RaceDto[]>) => {
            this.races = races;

            if (races.kind === 'Data') {
                this.groups = [RaceType.Slalom, RaceType.GiantSlalom, RaceType.SuperG, RaceType.Downhill]
                    .map(raceType => ({
                        raceType: raceType,
                        data: races.data.filter(r => r.raceType === raceType)
                    }));
            }
        });
    }

    ngOnInit() {
        this.store.dispatch(new GetSeasons());
    }

    formatRaceType = formatRaceType;
    formatGender = formatGender;
}
