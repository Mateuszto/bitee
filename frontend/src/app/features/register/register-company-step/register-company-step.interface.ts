import { FormControl } from '@angular/forms';

export interface RegisterCompanyFrom {
   country: FormControl<string>;
   nip: FormControl<string>;
   companyName: FormControl<string>;
   address: FormControl<string>;
   city: FormControl<string>;
   postalCode: FormControl<string>;
   phone: FormControl<string>;
   acceptTerms: FormControl<boolean>;
   acceptPrivacy: FormControl<boolean>;
   acceptMarketing: FormControl<boolean>;
   acceptAll: FormControl<boolean>;
}
