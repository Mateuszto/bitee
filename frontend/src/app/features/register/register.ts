import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiNotification } from '@taiga-ui/core';
import { TuiStepper } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { RegisterFormService } from './services/register-form.service';
import { RegisterCoreStepComponent } from './register-core-step/register-core-step';
import { RegisterCompantStepComponent } from './register-company-step/register-company-step';
import { TitleSizeDirective } from '../../shared/directives/title-size.directive';
import { RegisterCoreStepFormService } from './register-core-step/register-core-step-form.service';
import { RegisterCompanyStepFormService } from './register-company-step/register-company-step-form.service';
import { RegisterStateService } from './services/register-state.service';

@Component({
   selector: 'app-register',
   templateUrl: './register.html',
   imports: [
      TuiButton,
      TuiHeader,
      TuiNotification,
      TuiStepper,
      RouterLink,
      RegisterCoreStepComponent,
      RegisterCompantStepComponent,
      TitleSizeDirective,
   ],
   providers: [
      RegisterFormService,
      RegisterCoreStepFormService,
      RegisterCompanyStepFormService,
      RegisterStateService,
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
   protected readonly registerForm = inject(RegisterFormService);
   protected readonly state = inject(RegisterStateService);
}
