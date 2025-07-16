import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiIcon, TuiPopup, TuiBreakpointService } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { TuiDrawer } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.html',
   imports: [
      TuiNavigation,
      TuiIcon,
      TuiButton,
      TuiDrawer,
      TuiButton,
      TuiPopup,
      RouterLink,
      AsyncPipe,
   ],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
   protected readonly breakpoint$ = inject(TuiBreakpointService);

   protected signInButtonText = 'Zaloguj';
   protected signUpButtonText = 'Wypróbuj za darmo';

   protected readonly open = signal(false);
}
