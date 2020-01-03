import { Component, OnInit } from '@angular/core';

import { Gender } from '../../enums/gender.enum';
import { SkierDto } from '../../dtos';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
    selector: 'app-skier-list',
    templateUrl: './skier-list.component.html',
    styleUrls: ['./skier-list.component.scss']
})
export class SkierListComponent implements OnInit {
    public skiers: SkierDto[] = [];

    constructor(
        private appStateService: AppStateService
    ) { }

    async ngOnInit() {
        this.skiers = await this.appStateService.getAll();
        console.table(this.skiers);
    }
}
