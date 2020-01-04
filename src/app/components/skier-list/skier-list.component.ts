import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SkierDto } from '../../dtos';
import { State } from 'src/app/reducers';
import { getAllSkiers, newSkier } from 'src/app/actions';
import { fullName } from 'src/app/util';

@Component({
    selector: 'app-skier-list',
    templateUrl: './skier-list.component.html',
    styleUrls: ['./skier-list.component.scss']
})
export class SkierListComponent implements OnInit {
    private skiers: SkierDto[] = [];

    public isLoading$: Observable<boolean>;
    public hasError$: Observable<boolean>;

    public filter = null;

    public get filteredSkiers(): SkierDto[] {
        if (this.filter == null) {
            return this.skiers;
        }

        const filter = this.filter.toLowerCase();
        return this.skiers.filter(s => fullName(s).toLowerCase().includes(filter));
    }

    constructor(
        private store: Store<State>
    ) {
        store.select(s => s.skier.all)
            .subscribe(skiers => this.skiers = skiers);

        this.isLoading$ = store.select(s => s.skier.isLoading);
        this.hasError$ = store.select(s => s.skier.isError);
    }

    async ngOnInit() {
        this.store.dispatch(getAllSkiers());
    }

    public new() {
        this.store.dispatch(newSkier());
    }
}
