import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormArray,
    FormGroup,
    ValidationErrors,
} from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    public _httpClient = inject(HttpClient);

    validateUniqueness(
        url: string,
        queryName: string,
        currentValue?: string
    ): AsyncValidatorFn {
        return (
            control: AbstractControl
        ): Observable<ValidationErrors | null> => {
            if (!control.value || control.value === currentValue) {
                return of(null);
            }

            if (!control.value) {
                return of(null);
            }

            return of(control.value).pipe(
                debounceTime(500),
                switchMap((value) =>
                    this._httpClient.get(url, {
                        params: { [queryName]: value },
                    })
                ),
                map((res: any) => {
                    if (res === true) {
                        return { unique: true };
                    } else {
                        return null;
                    }
                }),
                catchError((error) => {
                    return of(null);
                })
            );
        };
    }

    getFormValidationErrors(
        form: FormGroup | FormArray,
        path: string = ''
    ): any[] {
        const errors: any[] = [];

        Object.keys(form.controls).forEach((key) => {
            const control = form.get(key);
            const controlPath = path ? `${path}.${key}` : key;

            if (control instanceof FormGroup || control instanceof FormArray) {
                errors.push(
                    ...this.getFormValidationErrors(control, controlPath)
                );
            } else if (control?.errors) {
                Object.entries(control.errors).forEach(
                    ([errorKey, errorValue]) => {
                        errors.push({
                            control: controlPath,
                            errorKey,
                            errorValue,
                        });
                    }
                );
            }
        });

        return errors;
    }

    constructor() {}
}
