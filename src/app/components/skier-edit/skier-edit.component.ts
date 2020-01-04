import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SkierDto } from 'src/app/dtos';
import { Gender } from 'src/app/enums';
import { getErrorMessage, hasError } from 'src/app/util/form-util';
import { State } from 'src/app/reducers';
import { getAllCountries } from 'src/app/actions/countries.actions';
import { getSkierById, saveSkier, removeSkier } from 'src/app/actions';
import { Observable } from 'rxjs';

export const length = (min: number, max: number) => [Validators.required, Validators.minLength(min), Validators.maxLength(max)];

const newSkier: SkierDto = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: Gender.Male,
    countryCode: null,
    birthDate: null,
    isActive: true,
    image: null
};

@Component({
    selector: 'app-skier-edit',
    templateUrl: './skier-edit.component.html',
    styleUrls: ['./skier-edit.component.scss']
})
export class SkierEditComponent implements OnInit {
    public skier: SkierDto = null;
    public countryCodes$: Observable<string[]>;

    public skierForm: FormGroup = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private store: Store<State>
    ) {
        this.countryCodes$ = this.store.select(state => state.countryCodes);

        this.store.select(state => state.skier.selected)
            .subscribe(skier => {
                this.skier = skier != null
                    ? skier
                    : newSkier;

                this.skierForm = this.initForm();
                this.skierForm.patchValue(this.skier);
            });
    }

    ngOnInit() {
        this.store.dispatch(getAllCountries());

        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.store.dispatch(getSkierById({ id }));
        });
    }

    private initForm() {
        return this.fb.group({
            firstName: ['', length(2, 100)],
            lastName: ['', length(2, 100)],
            gender: [Gender.Male],
            countryCode: ['', length(3, 3)],
            birthDate: [null], // TODO:
            isActive: [true],
            image: [null, Validators.maxLength(500)] // TODO: maxlength!
        })
    }

    public async save() {
        this.skierForm.markAllAsTouched();
        if (this.skierForm.valid) {
            const skier: SkierDto = {
                ...this.skier,
                ...this.skierForm.getRawValue()
            };

            // TODO: Errorhandling
            this.store.dispatch(saveSkier({ skier }));
        }
    }

    public remove() {
        console.log("TODO: remove");
        this.store.dispatch(removeSkier({ id: this.skier.id }));
    }

    public hasError(formControlName: string) {
        return hasError(this.skierForm, formControlName);
    }

    public getErrorMessage(formControlName: string) {
        return getErrorMessage(this.skierForm, formControlName);
    }
}
