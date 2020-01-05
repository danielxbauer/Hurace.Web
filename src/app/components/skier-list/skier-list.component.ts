import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SkierDto } from '../../dtos';
import { State } from 'src/app/reducers';
import { getAllSkiers, newSkier } from 'src/app/actions';
import { fullName } from 'src/app/util';
import { ApiResource, data } from 'src/app/models';

@Component({
    selector: 'app-skier-list',
    templateUrl: './skier-list.component.html',
    styleUrls: ['./skier-list.component.scss']
})
export class SkierListComponent implements OnInit {
    public skiers: ApiResource<SkierDto[]> = data([]);

    public filter = null;

    public get filteredSkiers(): SkierDto[] {
        if (this.skiers.kind == "Data") {
            if (this.filter == null) {
                return this.skiers.data;
            }

            const filter = this.filter.toLowerCase();
            return this.skiers.data.filter(s => fullName(s).toLowerCase().includes(filter));
        }

        return [];
    }

    constructor(
        private store: Store<State>
    ) {
        store.select(s => s.skier.all)
            .subscribe(skiers => this.skiers = skiers);
    }

    async ngOnInit() {
        this.store.dispatch(getAllSkiers());
    }

    public new() {
        this.store.dispatch(newSkier());
    }
}
