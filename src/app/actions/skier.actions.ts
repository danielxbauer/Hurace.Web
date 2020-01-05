import { createAction } from '@ngrx/store';
import { SkierDto } from '../dtos';
import { hasId, hasData } from '../util';

export const getAllSkiers = createAction('[Skier] GetAll');
export const getAllSkiersSuccess = createAction('[Skier] GetAll Success', hasData<SkierDto[]>());
export const getAllSkiersError = createAction('[Skier] GetAll Error');

export const getSkierById = createAction('[Skier] GetById', hasId);
export const getSkierByIdSuccess = createAction('[Skier] GetById Success', hasData<SkierDto>());
export const getSkierByIdError = createAction('[Skier] GetById Error');

export const saveSkier = createAction('[Skier] Save', hasData<SkierDto>());
export const saveSkierSuccess = createAction('[Skier] Save Success', hasId);
export const saveSkierError = createAction('[Skier] Save Error');

export const removeSkier = createAction('[Skier] Remove', hasId);
export const removeSkierSuccess = createAction('[Skier] Remove Success');
export const removeSkierError = createAction('[Skier] Remove Error');

export const newSkier = createAction('[Skier] New');
export const selectSkier = createAction('[Skier] Select', hasId);
