import { createAction, props } from '@ngrx/store';
import { SkierDto } from '../dtos';
import { idParam } from '../util';

export const getAllSkiers = createAction('[Skier] GetAll');
export const getAllSkiersSuccess = createAction('[Skier] GetAll Success', props<{ payload: SkierDto[] }>());
export const getAllSkiersError = createAction('[Skier] GetAll Error');

export const getSkierById = createAction('[Skier] GetById', idParam);
export const getSkierByIdSuccess = createAction('[Skier] GetById Success', props<{ skier: SkierDto }>());
export const getSkierByIdError = createAction('[Skier] GetById Error');

export const saveSkier = createAction('[Skier] Save', props<{ skier: SkierDto }>());
export const saveSkierSuccess = createAction('[Skier] Save Success', idParam);
export const saveSkierError = createAction('[Skier] Save Error');

export const removeSkier = createAction('[Skier] Remove', idParam);

export const newSkier = createAction('[Skier] New');
export const selectSkier = createAction('[Skier] Select', idParam);
