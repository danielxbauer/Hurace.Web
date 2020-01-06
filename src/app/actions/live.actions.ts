import { RunNumber } from '../models';

export class GetLiveAllRaces {
    static readonly type = '[Live] GetRaces';
}

export class GetLiveRace {
    static readonly type = '[Live] GetRace';
    constructor(public id: number) { }
}

export class GetLiveStatistic {
    static readonly type = '[Live] GetStatistic';
    constructor(
        public id: number,
        public runNumber: RunNumber
    ) { }
}
