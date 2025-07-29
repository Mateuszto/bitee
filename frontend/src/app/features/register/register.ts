import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { TuiButton, TuiBreakpointService, TuiNotification } from '@taiga-ui/core';
import { TUI_PASSWORD_TEXTS, TuiStepper } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { RegisterFormService } from './register-form.service';
import { TUI_BREAKPOINT, TuiBreakpointValues } from '../../shared/consts/tui-breakpoint';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasicDataStepComponent } from './basic-data-step/basic-data-step';
import { CompanyDataStepComponent } from './company-data-step/company-data-step';

@Component({
   selector: 'app-register',
   templateUrl: './register.html',
   imports: [
      TuiButton,
      TuiHeader,
      TuiNotification,
      TuiStepper,
      RouterLink,
      BasicDataStepComponent,
      CompanyDataStepComponent,
   ],
   providers: [
      RegisterFormService,
      {
         provide: TUI_PASSWORD_TEXTS,
         useValue: of(['Pokaż hasło', 'Ukryj hasło']),
      },
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
   protected readonly registerForm = inject(RegisterFormService);
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
