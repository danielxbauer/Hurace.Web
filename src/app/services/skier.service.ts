import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SkierDto } from 'src/app/dtos';
import { Gender } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class SkierService {
    private baseUrl = `${environment.apiBaseUrl}/api/skier`;
    private httpOptions = { // TODO: do i need this?
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    constructor(
        private http: HttpClient
    ) { }

    public getAll(gender: Gender, isActive: boolean = true) {
        return this.http.get<SkierDto[]>(`${this.baseUrl}/${gender}/active/${isActive}`);
    }

    public save(skier: SkierDto) {
        return this.http.post(this.baseUrl, skier, this.httpOptions);
    }
}
