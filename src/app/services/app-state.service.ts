import { Injectable } from '@angular/core';
import { SkierDto } from 'src/app/dtos';
import { Gender } from '../enums';
import { SkierApiService } from './api';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private skiers: SkierDto[];
    private countryCodes: string[];

    constructor(
        private skierService: SkierApiService
    ) { }

    public async getAll() {
        this.skiers = await this.skierService.getAll(Gender.Male).toPromise();
        return this.skiers;
    }

    // TODO: anders machen
    public async getById(id: number) {
        if (this.skiers == null) {
            await this.getAll();
        }

        return this.skiers.find(s => s.id === id);
    }

    // TODO: load from api!
    public async getCountryCodes() {
        if (this.skiers == null) {
            await this.getAll();
        }

        this.countryCodes = [...new Set(this.skiers.map(s => s.countryCode))];

        return this.countryCodes;
    }
}
