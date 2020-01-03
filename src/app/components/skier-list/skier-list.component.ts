import { Component, OnInit } from '@angular/core';

import { SkierService } from '../../services/skier.service';
import { Gender } from '../../enums/gender.enum';
import { SkierDto } from '../../dtos';

@Component({
    selector: 'app-skier-list',
    templateUrl: './skier-list.component.html',
    styleUrls: ['./skier-list.component.scss']
})
export class SkierListComponent implements OnInit {
    public skiers: SkierDto[] = [];

    constructor(
        private skierService: SkierService
    ) { }

    async ngOnInit() {
        this.skiers = await this.skierService.getAll(Gender.Male).toPromise();
        console.table(this.skiers);
    }
}
