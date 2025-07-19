import {
   Component,
   AfterViewInit,
   ChangeDetectionStrategy,
   inject,
   computed,
   Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiTitle, TuiBreakpointService } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';

import { gsap } from 'gsap';
import { toSignal } from '@angular/core/rxjs-interop';
import { TUI_BREAKPOINT, TuiBreakpointValues } from '../../../../shared/consts/tui-breakpoint';

@Component({
   selector: 'app-hero',
   templateUrl: './hero.html',
   imports: [TuiButton, TuiTitle, TuiHeader, RouterLink],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit {
   private readonly tuiBreakpointService: TuiBreakpointService =
      inject(TuiBreakpointService);

   private readonly wavePaths: string[] = [
      'M0,160L48,170.7C96,181,192,203,288,181.3C384,160,480,96,576,74.7C672,53,768,75,864,117.3C960,160,1056,224,1152,256C1248,288,1344,288,1392,288L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      'M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,149.3C672,160,768,192,864,186.7C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
   ];

   tuiBreakpoint: Signal<TuiBreakpointValues | null> = toSignal(this.tuiBreakpointService, {
      initialValue: TUI_BREAKPOINT.DESKTOP_LARGE,
   });
   
   tuiHeader: Signal<TuiHeader['size']> = computed((): TuiHeader['size'] => {
      switch (this.tuiBreakpoint()) {
         case TUI_BREAKPOINT.MOBILE:
            return 'h4';
         case TUI_BREAKPOINT.DESKTOP_SMALL:
            return 'h2';
         case TUI_BREAKPOINT.DESKTOP_LARGE:
         default:
            return 'h1';
      }
   });

   ngAfterViewInit(): void {
      this.waveAnimation();
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
}
