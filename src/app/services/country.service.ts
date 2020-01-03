import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    private baseUrl = `${environment.apiBaseUrl}/api/location`;

    constructor(
        private http: HttpClient
    ) { }

    public getCountryCodes() {
        return this.http.get<string[]>(`${this.baseUrl}/country`);
    }
}
