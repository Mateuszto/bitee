import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiError, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegisterCoreStepFormService } from './register-core-step-form.service';
import { RegisterStateService } from '../services/register-state.service';

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
   protected readonly coreForm = inject(RegisterCoreStepFormService);
   protected readonly state = inject(RegisterStateService);
}
