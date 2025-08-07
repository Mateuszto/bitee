export const TUI_BREAKPOINT = {
   MOBILE: 'mobile',
   TABLET: 'tablet',
   DESKTOP_SMALL: 'desktopSmall',
   DESKTOP_LARGE: 'desktopLarge',
} as const;

export type TuiBreakpointValues =
   (typeof TUI_BREAKPOINT)[keyof typeof TUI_BREAKPOINT];
