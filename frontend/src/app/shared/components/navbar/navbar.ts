import { Component } from "@angular/core";
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import { TuiNavigation } from "@taiga-ui/layout";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [TuiNavigation, TuiIcon, TuiButton],
})
export class Navbar {
  protected signInButtonText = 'Zaloguj';
  protected signUpButtonText = 'Wypróbuj za darmo';
}