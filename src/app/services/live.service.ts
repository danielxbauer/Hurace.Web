import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { LiveRunUpdate, LiveCurrentRunChange, LiveRunStopped } from '../actions/live.actions';

@Injectable({
    providedIn: 'root'
})
export class LiveService {
    private baseUrl = `${environment.apiBaseUrl}/live`;

    constructor(
        public store: Store
    ) { }

    public initSignalR() {
        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(this.baseUrl)
            .build();

        connection.start()
            .then(() => {
                console.log('Connected!');
            })
            .catch((err) => {
                return console.error(err.toString());
            });

        connection.on("OnRunUpdate",
            liveStatistic => this.store.dispatch(new LiveRunUpdate(liveStatistic)));

        connection.on("OnCurrentRunChange",
            liveStatistic => this.store.dispatch(new LiveCurrentRunChange(liveStatistic)));

        connection.on("OnRunStopped",
            (reason, liveStatistic) => this.store.dispatch(new LiveRunStopped(reason, liveStatistic)));
    }
}
