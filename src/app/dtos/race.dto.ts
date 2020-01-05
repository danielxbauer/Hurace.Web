import { Gender, RaceType } from '../enums';

export interface RaceDto {
    id: number,
    name: string,
    description: string,
    raceDate: Date, // TODO:!
    raceType: RaceType,
    locationId: number,
    sensorAmount: number,
    gender: Gender,
    // TODO: add? raceState: RaceState,
}
