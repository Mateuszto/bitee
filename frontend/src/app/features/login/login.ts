import {
   AfterViewInit,
   ChangeDetectionStrategy,
   Component,
   inject,
   OnDestroy,
   signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiError, TuiIcon, TuiTextfield, TuiBreakpointService } from '@taiga-ui/core';
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
export class LoginComponent implements AfterViewInit, OnDestroy {
   protected readonly title = 'Zaloguj się do Bitee';
   protected readonly description = 'Wprowadź swoje dane, aby zalogować się do aplikacji.';
   protected readonly loginInButtonText = 'Zaloguj się';
   protected readonly passwordLabel = 'Hasło';
   protected readonly passwordPlaceholder = 'Wprowadź swoje hasło';
   protected readonly emailLabel = 'E-mail';
   protected readonly emailPlaceholder = 'Wprowadź swój e-mail';
   protected readonly rememberMeLabel = 'Zapamiętaj mnie';
   protected readonly redirectToRegisterText = 'Nie masz konta? Zarejestruj się';
   protected readonly showPasswordHint = 'Pokaż hasło';

   protected readonly loginForm = inject(LoginFormService);
   private readonly breakpoint$ = inject(TuiBreakpointService);

   private readonly subscription = new Subscription();
   protected readonly titleSize = signal<TuiHeader['size']>('h1');

   ngAfterViewInit(): void {
      this.getTitleSize();
   }

   private getTitleSize(): void {
      this.subscription.add(
         this.breakpoint$.subscribe((breakpoint) => {
            switch (breakpoint) {
               case 'mobile':
                  this.titleSize.set('h4');
                  break;
               case 'desktopSmall':
                  this.titleSize.set('h2');
                  break;
               case 'desktopLarge':
               default:
                  this.titleSize.set('h1');
                  break;
            }
         }),
      );
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }
}
