import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TuiButton, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiCheckbox, TuiFieldErrorPipe, TuiButtonLoading } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { AsyncPipe } from '@angular/common';
import { MaskitoDirective } from '@maskito/angular';
import { postalCodeMask } from '../../../shared/masks/postal-code-mask';
import { phoneMask } from '../../../shared/masks/phone-mask';
import { nipMask } from '../../../shared/masks/nip-mask';
import { RegisterCompanyStepFormService } from '../services/register-company-step-form-service';
import { RegisterState } from '../register-state';
import { RegisterActionsService } from '../services/register-actions-service';

@Component({
   selector: 'app-register-company-step',
   templateUrl: './register-company-step.html',
   imports: [
      TuiForm,
      TuiTextfield,
      TuiCheckbox,
      TuiError,
      TuiButton,
      TuiButtonLoading,
      TuiFieldErrorPipe,
      ReactiveFormsModule,
      FormsModule,
      AsyncPipe,
      MaskitoDirective,
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCompantStepComponent {
   protected readonly registerCoreStepFormService = inject(RegisterCompanyStepFormService);
   protected readonly registerState = inject(RegisterState);
   protected readonly registerCompanyStepFormService = inject(RegisterCompanyStepFormService);
   private readonly registerActionsServive = inject(RegisterActionsService);

   protected readonly postalCodeMask = postalCodeMask;
   protected readonly nipMask = nipMask;
   protected readonly phoneMask = phoneMask('PL');

   protected submit(): void {
      const coreForm = this.registerCoreStepFormService.form;
      const companyForm = this.registerCompanyStepFormService.form;

      const coreData = coreForm.getRawValue();
      const { acceptAll, ...companyData } = companyForm.getRawValue();
      const registerData = { ...coreData, ...companyData };

      if (coreForm.valid && companyForm.valid) {
         this.registerActionsServive.submit(registerData);
      } else {
         companyForm.markAllAsTouched();
         coreForm.markAllAsTouched();
      }
   }
}
