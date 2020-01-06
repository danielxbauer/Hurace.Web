export interface RaceStatisticEntry { // TODO: into models folder
    currentPosition: number;
    deltaPosition: number | null;
    skierId: number;
    skierName: string;
    skierCountry: string;
    time: string;
    deltaTimeLeadership: string;
}

export interface RaceStatisticEntryDto {
    currentPosition: number;
    deltaPosition: number | null;
    skierId: number;
    time: string;
    deltaTimeLeadership: string;
}
