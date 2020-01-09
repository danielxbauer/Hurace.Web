import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetSeasons } from 'src/app/actions/season.actions';
import { RaceDto } from 'src/app/dtos';
import { ApiResource } from 'src/app/models';
import { RaceType } from 'src/app/enums';
import { formatRaceType, formatGender } from 'src/app/util';
import { Props } from 'src/app/models/props.model';
import { SeasonStateModel } from 'src/app/states/season.state';

interface RaceGroup {
    raceType: RaceType,
    data: RaceDto[]
}

interface SeasonFilter {
    from: Date,
    to: Date
}

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
    public races: ApiResource<RaceDto[]>;
    public displayedColumns: Props<RaceDto & { actions: any }> = ['name', 'raceDate', 'gender', 'actions'];

    public filter: SeasonFilter = { from: new Date(), to: new Date() };
    public groups: RaceGroup[];

    constructor(
        private store: Store
    ) {
        this.store.select(s => s.season.races).subscribe((races: ApiResource<RaceDto[]>) => {
            this.races = races;

            if (races.kind === 'Data') {
                this.filter.from.setFullYear(2019);
                this.filterChange();
            }
        });
    }

    ngOnInit() {
        this.store.dispatch(new GetSeasons());
    }

    filterFromChange(from: Date) {
        this.filter.from = from;
        this.filterChange();
    }

    filterToChange(to: Date) {
        this.filter.to = to;
        this.filterChange();
    }

    filterChange() {
        console.log(this.filter);

        if (this.races.kind === 'Data') {
            const races = this.races.data;

            this.groups = [RaceType.Slalom, RaceType.GiantSlalom, RaceType.SuperG, RaceType.Downhill]
                .map(raceType => ({
                    raceType: raceType,
                    data: races
                        .filter(r => r.raceType === raceType)
                        .filter(r => r.raceDate >= this.filter.from
                                  && r.raceDate <= this.filter.to)
                }));
        }
    }

    formatRaceType = formatRaceType;
    formatGender = formatGender;
}
