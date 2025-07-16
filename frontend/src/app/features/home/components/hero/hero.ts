import {
   Component,
   AfterViewInit,
   ChangeDetectionStrategy,
   inject,
   signal,
   OnDestroy,
   WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiTitle, TuiBreakpointService } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';

import { gsap } from 'gsap';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-hero',
   templateUrl: './hero.html',
   imports: [TuiButton, TuiTitle, TuiHeader, RouterLink],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit, OnDestroy {
   protected readonly title: string =
      'Bitee – Nowoczesne oprogramowanie do zarządzania restauracją';
   protected readonly description: string =
      'Zarządzaj swoją restauracją z łatwością dzięki Bitee. Nasze oprogramowanie oferuje wszystko, czego potrzebujesz do efektywnego zarządzania zamówieniami, rezerwacjami i komunikacją z klientami.';
   protected readonly buttonText: string = 'Wypróbuj za darmo';

   private readonly wavePaths: string[] = [
      'M0,160L48,170.7C96,181,192,203,288,181.3C384,160,480,96,576,74.7C672,53,768,75,864,117.3C960,160,1056,224,1152,256C1248,288,1344,288,1392,288L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      'M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,149.3C672,160,768,192,864,186.7C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
   ];

   private readonly breakpoint$ = inject(TuiBreakpointService);

   private readonly subscription = new Subscription();
   protected readonly titleSize = signal<TuiHeader['size']>('h1');

   ngAfterViewInit(): void {
      this.getTitleSize();
      this.waveAnimation();
   }

   private getTitleSize(): void {
      this.subscription.add(
         this.breakpoint$.subscribe((breakpoint) => {
            switch (breakpoint) {
               case 'mobile':
                  this.titleSize.set('h4');
                  break;
               case 'desktopSmall':
                  this.titleSize.set('h2');
                  break;
               case 'desktopLarge':
               default:
                  this.titleSize.set('h1');
                  break;
            }
         }),
      );
   }

   private waveAnimation(): void {
      gsap.to('#wave', {
         duration: 8,
         repeat: -1,
         yoyo: true,
         ease: 'power1.inOut',
         attr: { d: this.wavePaths[1] },
         onStart: () => {
            const pathElement = document.getElementById('wave');
            if (pathElement) {
               pathElement.setAttribute('d', this.wavePaths[0]);
            }
         },
      });
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }
}
