import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Navbar } from "../../shared/components/navbar/navbar";
import { Hero } from "./components/hero/hero";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [Navbar, Hero],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

}