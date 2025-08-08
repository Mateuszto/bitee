import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
   TuiButton,
   TuiError,
   TuiIcon,
   TuiTextfield,
   TuiNotification,
} from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import {
   TuiCheckbox,
   TuiFieldErrorPipe,
   TuiPassword,
} from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { LoginFormService } from './login-form.service';
import { TitleSizeDirective } from '../../shared/directives/title-size.directive';

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
   ],
   providers: [
      LoginFormService
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
   protected readonly loginForm = inject(LoginFormService);
}
