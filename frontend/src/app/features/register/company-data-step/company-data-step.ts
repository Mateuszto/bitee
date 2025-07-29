import { ChangeDetectionStrategy, Component, input, output, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { TuiButton, TuiError, TuiTextfield } from '@taiga-ui/core';
import {
   TuiCheckbox,
   TuiFieldErrorPipe,
   tuiValidationErrorsProvider,
   TuiButtonLoading,
} from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { AsyncPipe } from '@angular/common';
import { CompanyForm } from '../register-form.service';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';

@Component({
   selector: 'app-company-data-step',
   templateUrl: './company-data-step.html',
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
   providers: [
      tuiValidationErrorsProvider({
         required: 'To pole jest wymagane',
         requiredTrue: 'To pole jest wymagane',
         postalCodeFormat: 'Kod pocztowy musi mieć format 00-000',
      }),
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDataStepComponent {
   public readonly formGroup = input.required<FormGroup<CompanyForm>>();
   public readonly isLoading = input.required<boolean>();
   public readonly onSubmit = output<void>();
   public readonly onPreviousStep = output<void>();

   // Polish postal code mask (00-000)
   protected readonly postalCodeMask: MaskitoOptions = {
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
   };

   protected onAcceptanceChange() {
      const acceptPrivacy = this.formGroup().controls.acceptPrivacy.value;
      const acceptMarketing = this.formGroup().controls.acceptMarketing.value;
      const acceptTerms = this.formGroup().controls.acceptTerms.value;

      const acceptAll = acceptPrivacy && acceptMarketing && acceptTerms;
      this.formGroup().controls.acceptAll.setValue(acceptAll);
   }

   protected selectAllAcceptances() {
      const acceptAll = this.formGroup().controls.acceptAll.value;

      this.formGroup().controls.acceptPrivacy.setValue(acceptAll);
      this.formGroup().controls.acceptMarketing.setValue(acceptAll);
      this.formGroup().controls.acceptTerms.setValue(acceptAll);
   }
}
