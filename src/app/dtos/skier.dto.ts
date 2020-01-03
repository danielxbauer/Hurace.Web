import { Gender } from '../enums';

export interface SkierDto {
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    countryCode: string;
    birthDate: Date | null; // TODO!
    image: string;
    isActive: boolean;
}
