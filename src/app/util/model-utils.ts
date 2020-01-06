import { SkierDto, RaceStatisticEntry, RaceStatisticEntryDto, RaceDto } from '../dtos';
import { Gender, RaceType } from '../enums';

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

export const mapStatisticDto = (dto: RaceStatisticEntryDto, skiers: SkierDto[]): RaceStatisticEntry => {
    const skier = skiers.find(s => s.id === dto.skierId);
    if (skier == null) {
        throw Error('Skier not found');
    }

    return {
        ...dto,
        skierName: fullName(skier),
        skierCountry: skier.countryCode
    };
}

export const hasSecondRun = (r: RaceDto) =>
    r.raceType === RaceType.Slalom || r.raceType === RaceType.GiantSlalom;
