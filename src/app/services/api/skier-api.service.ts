import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SkierDto } from 'src/app/dtos';
import { Gender } from '../../enums';

@Injectable({
    providedIn: 'root'
})
export class SkierApiService {
    private baseUrl = `${environment.apiBaseUrl}/api/skier`;
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    constructor(
        private http: HttpClient
    ) { }

    private errorHandler = (error: Error) => Observable.throw(error); // TODO: better

    public getAll(gender: Gender, isActive: boolean = true): Observable<SkierDto[]> {
        return this.http.get<SkierDto[]>(`${this.baseUrl}/${gender}/active/${isActive}`)
            .pipe(
                map(skiers => {
                    skiers.forEach(s => s.birthDate = new Date(s.birthDate));
                    return skiers;
                }),
                catchError(this.errorHandler)
            );
    }

    public save(skier: SkierDto) {
        return this.http.post(this.baseUrl, skier, this.httpOptions);
    }
}
