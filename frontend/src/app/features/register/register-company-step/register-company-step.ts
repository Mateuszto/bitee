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
import { RegisterCompanyStepFormService } from './register-company-step-form.service';
import { RegisterStateService } from '../services/register-state.service';
import { RegisterFormService } from '../services/register-form.service';

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
   protected companyForm = inject(RegisterCompanyStepFormService);
   protected registerForm = inject(RegisterFormService);
   protected state = inject(RegisterStateService);

   protected readonly postalCodeMask = postalCodeMask;
   protected readonly nipMask = nipMask;
   protected readonly phoneMask = phoneMask('PL');
}
