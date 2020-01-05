import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { RaceResultDto } from 'src/app/dtos';
import { RunNumber } from '../models';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    private baseUrl = `${environment.apiBaseUrl}/api/statistic`;

    constructor(
        private http: HttpClient
    ) { }

    public getRaceStatistic(id: number, runNumber: RunNumber, sensorAmount: number) {
        return this.http.get<RaceResultDto[]>(`${this.baseUrl}/${id}/run/${runNumber}/sensors/${sensorAmount}`);
    }
}
