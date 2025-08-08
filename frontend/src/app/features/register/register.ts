import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiNotification } from '@taiga-ui/core';
import { TuiStepper } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { RegisterCoreStepComponent } from './register-core-step/register-core-step';
import { RegisterCompantStepComponent } from './register-company-step/register-company-step';
import { TitleSizeDirective } from '../../shared/directives/title-size.directive';
import { RegisterCoreStepFormService } from './services/register-core-step-form-service';
import { RegisterCompanyStepFormService } from './services/register-company-step-form-service';
import { RegisterState } from './register-state';
import { RegisterActionsService } from './services/register-actions-service';

@Component({
   selector: 'app-register',
   templateUrl: './register.html',
   imports: [
      TuiHeader,
      TuiNotification,
      TuiStepper,
      RouterLink,
      RegisterCoreStepComponent,
      RegisterCompantStepComponent,
      TitleSizeDirective,
   ],
   providers: [
      RegisterCoreStepFormService,
      RegisterCompanyStepFormService,
      RegisterState,
      RegisterActionsService,
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
   protected readonly registerState = inject(RegisterState);
}
