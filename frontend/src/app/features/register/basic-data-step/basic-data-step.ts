import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { TuiButton, TuiError, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TUI_PASSWORD_TEXTS } from '@taiga-ui/kit';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider, TuiPassword } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-basic-data-step',
   templateUrl: './basic-data-step.html',
   imports: [
      TuiForm,
      TuiTextfield,
      TuiPassword,
      TuiIcon,
      TuiError,
      TuiButton,
      TuiFieldErrorPipe,
      ReactiveFormsModule,
      AsyncPipe,
      RouterLink,
   ],
   providers: [
      tuiValidationErrorsProvider({
         required: 'To pole jest wymagane',
         email: 'Wprowadź poprawny adres e-mail',
         minlength: 'Hasło musi mieć co najmniej 8 znaków',
      }),
      {
         provide: TUI_PASSWORD_TEXTS,
         useValue: of(['Pokaż hasło', 'Ukryj hasło']),
      },
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDataStepComponent {
   public readonly formGroup = input.required<FormGroup>();
   public readonly canProceed = input.required<boolean>();

   public readonly onSubmit = output<void>();
}
