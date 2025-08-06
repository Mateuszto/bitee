import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function nipValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!/^\d{10}$/.test(value)) {
         return { nipFormat: true };
      }

      const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
      const sum = String(value)
         .split('')
         .slice(0, 9)
         .reduce((acc, val, idx) => acc + Number(val) * weights[idx], 0);

      return sum % 11 === Number(value[9]) ? null : { nipFormat: true };
   };
}
