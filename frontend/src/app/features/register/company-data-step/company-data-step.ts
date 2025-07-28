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
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, of } from 'rxjs';

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
   ],
   providers: [
      tuiValidationErrorsProvider({
         required: 'To pole jest wymagane',
         requiredTrue: 'To pole jest wymagane',
      }),
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDataStepComponent {
   public readonly formGroup = input.required<FormGroup>();
   public readonly isLoading = input.required<boolean>();
   public readonly onSubmit = output<void>();
   public readonly onPreviousStep = output<void>();

   private readonly acceptanceValues = toSignal(
      combineLatest<[boolean, boolean, boolean]>([
         this.formGroup().controls['acceptPrivacy'].valueChanges ?? of(false),
         this.formGroup().controls['acceptMarketing'].valueChanges ?? of(false),
         this.formGroup().controls['acceptTerms'].valueChanges ?? of(false),
      ]),
      { initialValue: [false, false, false] as [boolean, boolean, boolean] },
   );

   private readonly acceptAll = toSignal<boolean>(
      this.formGroup().controls['acceptAll'].valueChanges ?? of(false),
   );

   private readonly acceptanceEffect = effect(() => {
      const allAccepted = this.acceptanceValues().every((value) => value);
      if (allAccepted) {
         // select checkbox "select all"
      }
   });
}
