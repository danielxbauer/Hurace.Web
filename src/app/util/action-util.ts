import { props } from '@ngrx/store';

export const hasId = props<{ id: number }>();
export const hasData = <T>() => props<{ payload: T }>();
