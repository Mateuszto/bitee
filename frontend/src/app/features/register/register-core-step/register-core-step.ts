import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiError, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegisterCoreStepFormService } from '../services/register-core-step-form-service';
import { RegisterState } from '../register-state';

@Component({
   selector: 'app-register-core-step',
   templateUrl: './register-core-step.html',
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
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCoreStepComponent {
   protected readonly registerCoreStepFormService = inject(RegisterCoreStepFormService);
   protected readonly registerState = inject(RegisterState);
}
