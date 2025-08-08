import { Directive, inject, Signal, effect, computed, ChangeDetectorRef } from '@angular/core';
import { TuiBreakpointService } from '@taiga-ui/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TUI_BREAKPOINT, TuiBreakpointValues } from '../consts/tui-breakpoint';
import { TuiHeader } from '@taiga-ui/layout';

@Directive({
  selector: '[titleSize]',
  standalone: true,
})
export class TitleSizeDirective {
  private readonly tuiBreakpointService = inject(TuiBreakpointService);
  private readonly tuiHeader = inject(TuiHeader);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly tuiBreakpoint: Signal<TuiBreakpointValues | null> = toSignal(
    this.tuiBreakpointService,
    {
      initialValue: TUI_BREAKPOINT.DESKTOP_LARGE,
    },
  );

  private readonly tuiHeaderSize: Signal<TuiHeader['size']> = computed(() => {
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

  private readonly tuiHeaderSizeEffect = effect(() => {
    this.tuiHeader.size = this.tuiHeaderSize();
    this.cdr.markForCheck();
  });
}