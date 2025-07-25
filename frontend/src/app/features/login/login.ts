import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import {
   TuiButton,
   TuiError,
   TuiIcon,
   TuiTextfield,
   TuiBreakpointService,
   TuiNotification,
} from '@taiga-ui/core';
import { TUI_PASSWORD_TEXTS, TuiButtonLoading } from '@taiga-ui/kit';
import {
   TuiCheckbox,
   TuiFieldErrorPipe,
   tuiValidationErrorsProvider,
   TuiPassword,
} from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { LoginFormService } from './login-form.service';
import { AsyncPipe } from '@angular/common';
import { TUI_BREAKPOINT, TuiBreakpointValues } from '../../shared/consts/tui-breakpoint';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
   selector: 'app-login',
   templateUrl: './login.html',
   imports: [
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
      LoginFormService,
      tuiValidationErrorsProvider({
         required: 'To pole jest wymagane',
         email: 'Wprowadź poprawny adres e-mail',
      }),
      {
         provide: TUI_PASSWORD_TEXTS,
         useValue: of(['Pokaż hasło', 'Ukryj hasło']),
      },
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
   protected readonly loginForm = inject(LoginFormService);
   private readonly tuiBreakpointService = inject(TuiBreakpointService);

   protected readonly tuiHeader: Signal<TuiHeader['size']> = computed((): TuiHeader['size'] => {
      switch (this.tuiBreakpoint()) {
         case TUI_BREAKPOINT.MOBILE:
            return 'h4';
         case TUI_BREAKPOINT.DESKTOP_SMALL:
            return 'h2';
         case TUI_BREAKPOINT.DESKTOP_LARGE:
         default:
            return 'h1';
      }
   });

   private readonly tuiBreakpoint: Signal<TuiBreakpointValues | null> = toSignal(
      this.tuiBreakpointService,
      {
         initialValue: TUI_BREAKPOINT.DESKTOP_LARGE,
      },
   );
}
