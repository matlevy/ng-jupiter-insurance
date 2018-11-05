import { FormControl, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Traveller } from '../../model/traveller';

export class TravellersValidation {
    static containsAdults(control: FormArray): ValidationErrors {
        let containsAdults = false;
        for (const adult of control.value) {
            if (adult.age >= 18 ) {
                containsAdults = true;
            }
        }
        if (!containsAdults) {
            return {
                mustContainAdults: true
            };
        }
        return null;
    }
}
