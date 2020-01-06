import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SkierDto } from 'src/app/dtos';
import { Gender } from 'src/app/enums';
import { getErrorMessage, hasError, newSkier } from 'src/app/util';
import { ApiResource } from 'src/app/models';
import { GetSkierById, GetAllCountries, SaveSkier, RemoveSkier } from 'src/app/actions';

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
        private store: Store
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
        this.store.dispatch(new GetAllCountries());

        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.store.dispatch(new GetSkierById(id));
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
                    ...this.skier.data,
                    ...this.skierForm.getRawValue()
                };

                // TODO: Errorhandling
                this.store.dispatch(new SaveSkier(skier));
            }
        }
    }

    public remove() {
        if (this.skier.kind == 'Data') {
            this.store.dispatch(new RemoveSkier(this.skier.data.id));
        }
    }

    public hasError(formControlName: string) {
        return hasError(this.skierForm, formControlName);
    }

    public getErrorMessage(formControlName: string) {
        return getErrorMessage(this.skierForm, formControlName);
    }
}
