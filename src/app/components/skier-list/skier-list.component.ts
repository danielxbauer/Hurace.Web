import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { SkierDto } from '../../dtos';
import { State } from 'src/app/reducers';
import { getAllSkiers } from 'src/app/actions';


// TODO:
const fullName = (s: SkierDto) => `${s.firstName} ${s.lastName}`;

@Component({
    selector: 'app-skier-list',
    templateUrl: './skier-list.component.html',
    styleUrls: ['./skier-list.component.scss']
})
export class SkierListComponent implements OnInit {
    private skiers: SkierDto[] = [];

    public filter = null;

    public get filteredSkiers(): SkierDto[] {
        if (this.filter == null) {
            return this.skiers;
        }

        const filter = this.filter.toLowerCase();
        return this.skiers.filter(s => fullName(s).toLowerCase().includes(filter));
    }

    constructor(
        private router: Router,
        private store: Store<State>
    ) {
        store.select(s => s.skier.all)
            .subscribe(skiers => this.skiers = skiers);
    }

    async ngOnInit() {
        this.store.dispatch(getAllSkiers())
    }

    public new() {
        this.router.navigate(['skiers/0']);
    }
}
