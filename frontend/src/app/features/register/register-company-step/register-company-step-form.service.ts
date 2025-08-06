import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { RegisterCompanyFrom } from './register-company-step.interface';
import { nipValidator } from '../../../shared/validators/nip.validator';
import { postalCodeValidator } from '../../../shared/validators/postal-code.validator';
import { phoneValidator } from '../../../shared/validators/phone.validator';

@Injectable()
export class RegisterCompanyStepFormService {
   private readonly formBuilder = inject(NonNullableFormBuilder);

   public readonly form = this.formBuilder.group<RegisterCompanyFrom>({
      country: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      nip: this.formBuilder.control<string>('', {
         validators: [Validators.required, nipValidator()],
      }),
      companyName: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      address: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      city: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      postalCode: this.formBuilder.control<string>('', {
         validators: [Validators.required, postalCodeValidator()],
      }),
      phone: this.formBuilder.control<string>('', {
         validators: [Validators.required, phoneValidator('PL')],
      }),
      acceptTerms: this.formBuilder.control<boolean>(false, {
         validators: [Validators.requiredTrue],
      }),
      acceptPrivacy: this.formBuilder.control<boolean>(false, {
         validators: [Validators.requiredTrue],
      }),
      acceptMarketing: this.formBuilder.control<boolean>(false),
      acceptAll: this.formBuilder.control<boolean>(false),
   });

   public onAcceptanceChange() {
      const acceptPrivacy = this.form.controls.acceptPrivacy.value;
      const acceptMarketing = this.form.controls.acceptMarketing.value;
      const acceptTerms = this.form.controls.acceptTerms.value;

      const acceptAll = acceptPrivacy && acceptMarketing && acceptTerms;
      this.form.controls.acceptAll.setValue(acceptAll);
   }

   public selectAllAcceptances() {
      const acceptAll = this.form.controls.acceptAll.value;

      this.form.controls.acceptPrivacy.setValue(acceptAll);
      this.form.controls.acceptMarketing.setValue(acceptAll);
      this.form.controls.acceptTerms.setValue(acceptAll);
   }
}
