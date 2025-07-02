import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import {TuiChip} from '@taiga-ui/kit';


@Component({
   selector: 'app-root',
   imports: [RouterOutlet, TuiRoot, TuiChip],
   templateUrl: './app.html',
})
export class App {
   protected title = 'frontend';
}
