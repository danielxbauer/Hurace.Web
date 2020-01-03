import { createAction, props } from '@ngrx/store';
import { SkierDto } from '../dtos';
import { idParam } from '../util';

export const getAllSkiers = createAction('[Skier] GetAll');
export const getAllSkiersSuccess = createAction('[Skier] GetAll Success', props<{ payload: SkierDto[] }>());
export const getAllSkiersError = createAction('[Skier] GetAll Error');

export const getSkierById = createAction('[Skier] GetById', idParam);

export const saveSkier = createAction('[Skier] Save', props<{ skier: SkierDto }>());
export const removeSkier = createAction('[Skier] Remove', idParam);
