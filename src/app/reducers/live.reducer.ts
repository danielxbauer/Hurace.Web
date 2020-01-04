import { RaceDto } from '../dtos/race.dto';

export type DataStatus =
    "Loading" |
    { errorCode: string };

export interface LiveState {
    races: {
        status: DataStatus,
        data: RaceDto[]
    }
    selected: RaceDto
}
