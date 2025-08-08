import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
   TuiButton,
   TuiError,
   TuiIcon,
   TuiTextfield,
   TuiNotification, TuiTitle,
} from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import {
   TuiCheckbox,
   TuiFieldErrorPipe,
   TuiPassword,
} from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { LoginFormService } from './services/login-form-service';
import { TitleSizeDirective } from '../../shared/directives/title-size.directive';
import { LoginActionsService } from './services/login-actions-service';
import { LoginState } from './login-state';

@Component({
   selector: 'app-login',
   templateUrl: './login.html',
   imports: [
      TitleSizeDirective,
      TuiForm,
      TuiTextfield,
      TuiCheckbox,
      TuiPassword,
      TuiIcon,
      TuiError,
      TuiButton,
      TuiHeader,
      TuiButtonLoading,
      TuiFieldErrorPipe,
      TuiNotification,
      ReactiveFormsModule,
      AsyncPipe,
      RouterLink,
      TuiTitle,
   ],
   providers: [
      LoginFormService,
      LoginState,
      LoginActionsService
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
   protected readonly loginForm = inject(LoginFormService);
   protected readonly loginStateService = inject(LoginState);
   private readonly loginActionsService = inject(LoginActionsService);

   submit(): void {
      const form = this.loginForm.form;

      const {
         email,
         password,
         rememberMe
      } = form.getRawValue();

      if(form.valid) {
         this.loginActionsService.submit({
            email,
            password,
            rememberMe
         });
      } else {
         form.markAllAsTouched();
      }
   }
}
