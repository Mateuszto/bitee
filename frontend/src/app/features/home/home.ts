import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Navbar } from "../../shared/components/navbar/navbar";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

}