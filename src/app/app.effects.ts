import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
    constructor(
        private router: Router,
        private actions$: Actions) { }
}
