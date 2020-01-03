import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SkierDto } from '../../dtos';
import { AppStateService } from 'src/app/services/app-state.service';


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
        private appStateService: AppStateService
    ) { }

    async ngOnInit() {
        this.skiers = await this.appStateService.getAll();
    }

    public new() {
        this.router.navigate(['skiers/0']);
    }
}
