import { Component } from "@angular/core";
import {TuiIcon, tuiIconResolverProvider} from '@taiga-ui/core';
import { TuiNavigation } from "@taiga-ui/layout";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [TuiNavigation, TuiIcon],
  providers: [
    tuiIconResolverProvider((icon) =>
        icon.includes('/') ? icon : `/assets/icons/${icon}.svg`,
    ),
],
})
export class Navbar {
  
}