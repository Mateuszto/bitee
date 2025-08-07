import { AsyncPipe } from '@angular/common';
import {
   ChangeDetectionStrategy,
   Component,
   inject,
   signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
   TuiBreakpointService,
   TuiButton,
   TuiIcon,
   TuiPopup,
} from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.html',
   imports: [
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
