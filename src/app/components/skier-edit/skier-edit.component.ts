import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SkierDto } from 'src/app/dtos';
import { Gender } from 'src/app/enums';
import { getErrorMessage, hasError } from 'src/app/util/form-util';
import { State } from 'src/app/reducers';
import { getAllCountries } from 'src/app/actions/countries.actions';
import { getSkierById, saveSkier, removeSkier } from 'src/app/actions';
import { Observable } from 'rxjs';
import { newSkier } from 'src/app/util';
import { ApiResource } from 'src/app/models';

// TODO: put somewhere else
export const length = (min: number, max: number) => [Validators.required, Validators.minLength(min), Validators.maxLength(max)];

@Component({
    selector: 'app-skier-edit',
    templateUrl: './skier-edit.component.html',
    styleUrls: ['./skier-edit.component.scss']
})
export class SkierEditComponent implements OnInit {
    public skier: ApiResource<SkierDto>;
    public countryCodes$: Observable<string[]>;

    public skierForm: FormGroup = null;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private store: Store<State>
    ) {
        this.countryCodes$ = this.store.select(state => state.countryCodes);

        this.store.select(state => state.skier.selected)
            .subscribe(skier => {
                this.skier = skier;

                if (skier.kind == 'Data') {
                    const formValues = skier.data != null
                        ? skier.data
                        : newSkier();

                    this.skierForm = this.initForm();
                    this.skierForm.patchValue(formValues);
                }
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
        if (this.skier.kind == 'Data') {
            this.skierForm.markAllAsTouched();
            if (this.skierForm.valid) {
                const skier: SkierDto = {
                    ...this.skier,
                    ...this.skierForm.getRawValue()
                };

                // TODO: Errorhandling
                this.store.dispatch(saveSkier({ payload: skier }));
            }
        }
    }

    public remove() {
        if (this.skier.kind == 'Data') {
            this.store.dispatch(removeSkier({ id: this.skier.data.id }));
        }
    }

    public hasError(formControlName: string) {
        return hasError(this.skierForm, formControlName);
    }

    public getErrorMessage(formControlName: string) {
        return getErrorMessage(this.skierForm, formControlName);
    }
}
