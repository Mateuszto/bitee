import { Component } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [TuiNavigation, TuiIcon, TuiButton, RouterLink],
})
export class Navbar {
  protected signInButtonText = 'Zaloguj';
  protected signUpButtonText = 'Wypróbuj za darmo';
}
