import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const errors: ValidationErrors = {};

      if (value.length < 8) {
         errors['passwordMinLength'] = true;
      }
      if (!/[a-z]/.test(value)) {
         errors['passwordLowercase'] = true;
      }
      if (!/[A-Z]/.test(value)) {
         errors['passwordUppercase'] = true;
      }
      if (!/\d/.test(value)) {
         errors['passwordNumber'] = true;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
         errors['passwordSymbol'] = true;
      }

      return Object.keys(errors).length > 0 ? errors : null;
   };
}
