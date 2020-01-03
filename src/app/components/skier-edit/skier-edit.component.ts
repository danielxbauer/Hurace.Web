import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AppStateService } from 'src/app/services/app-state.service';
import { SkierDto } from 'src/app/dtos';
import { Gender } from 'src/app/enums';

export const length = (min: number, max: number) => [Validators.required, Validators.minLength(min), Validators.maxLength(max)];

@Component({
    selector: 'app-skier-edit',
    templateUrl: './skier-edit.component.html',
    styleUrls: ['./skier-edit.component.scss']
})
export class SkierEditComponent implements OnInit {
    public skier: SkierDto = null;
    public countryCodes: string[] = [];

    public skierForm: FormGroup = null;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private appStateService: AppStateService
    ) { }

    ngOnInit() {
        this.skierForm = this.initForm();

        this.route.params.subscribe(async params => {
            this.countryCodes = await this.appStateService.getCountryCodes();

            const id = +params['id'];
            const newSkier: SkierDto = {
                id: 0,
                firstName: '',
                lastName: '',
                gender: Gender.Male,
                countryCode: this.countryCodes[0],
                birthDate: null,
                isActive: true,
                image: null
            };

            const skier = id !== 0
                ? await this.appStateService.getById(id)
                : newSkier;
            this.skierForm.patchValue(skier);
        })
    }

    private initForm() {
        return this.fb.group({
            firstName: ['', length(2, 100)],
            lastName: ['', length(2, 100)],
            gender: [Gender.Male],
            countryCode: ['', length(3, 3)],
            birthDate: [null], // TODO:
            isActive: [true],
            image: [null] // TODO: maxlength!
        })
    }
}
