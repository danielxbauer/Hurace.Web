import { SkierDto } from '../dtos';
import { Gender, RaceType } from '../enums';
import { switchMap } from 'rxjs/operators';

export const fullName = (s: SkierDto) => `${s.firstName} ${s.lastName}`;

export const newSkier = (): SkierDto => ({
    id: 0,
    firstName: '',
    lastName: '',
    gender: Gender.Male,
    countryCode: null,
    birthDate: null,
    isActive: true,
    image: null
});

export const formatGender = (gender: Gender) => {
    switch (gender) {
        case Gender.Male: return 'Male';
        case Gender.Female: return 'Female';
        default: throw Error('Gender not defined');
    };
}

export const formatRaceType = (raceType: RaceType) => {
    switch (raceType) {
        case RaceType.Slalom: return 'Slalom';
        case RaceType.GiantSlalom: return 'GiantSlalom';
        case RaceType.SuperG: return 'SuperG';
        case RaceType.Downhill: return 'Downhill';
        default: throw Error('RaceType not defined');
    }
}
