import { Component } from "@angular/core";
import { TuiButton } from "@taiga-ui/core";

@Component({
    selector: 'app-hero',
    templateUrl: './hero.html',
    imports: [TuiButton]
})
export class Hero {
    public readonly title = 'Bitee – Nowoczesne oprogramowanie do zarządzania restauracją';
    public readonly description = 'Zarządzaj swoją restauracją z łatwością dzięki Bitee. Nasze oprogramowanie oferuje wszystko, czego potrzebujesz do efektywnego zarządzania zamówieniami, rezerwacjami i komunikacją z klientami.';
    public readonly buttonText = 'Wypróbuj za darmo';
}