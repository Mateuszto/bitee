import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function postalCodeValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const postalCodeRegex = /^\d{2}-\d{3}$/;
      const postalCode = postalCodeRegex.test(control.value);

      return postalCode ? null : { postalCodeFormat: true };
   };
}
