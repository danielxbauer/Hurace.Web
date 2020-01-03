import { FormGroup } from '@angular/forms';

export const hasError = (formGroup: FormGroup, formControlName: string) =>
    formGroup.get(formControlName).errors != null;

export const getErrorMessage = (formGroup: FormGroup, formControlName: string) => {
    const errors = formGroup.get(formControlName).errors;
    return Object.keys(errors)
        .map(error => {
            switch (error) {
                case 'required': return 'Required';
                case 'minlength': return `Min Length: ${errors.minlength.requiredLength} (Actual: ${errors.minlength.actualLength})`;
                case 'maxlength': return `Max Length: ${errors.maxlength.requiredLength} (Actual: ${errors.maxlength.actualLength})`;
                default: return 'Invalid input';
            }
        })
        .join(', ');
}
