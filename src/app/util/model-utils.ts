import { SkierDto } from '../dtos';
import { Gender } from '../enums';

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
