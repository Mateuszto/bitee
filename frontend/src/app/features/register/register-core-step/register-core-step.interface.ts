import { FormControl } from '@angular/forms';

export interface RegisterCoreForm {
   email: FormControl<string>;
   password: FormControl<string>;
}
