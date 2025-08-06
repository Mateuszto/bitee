import {
   ApplicationConfig,
   provideBrowserGlobalErrorListeners,
   provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { TUI_PASSWORD_TEXTS, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { TUI_VALIDATION_ERRORS } from './shared/consts/tui-validation-errors';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
      provideAnimations(),
      provideEventPlugins(),
      provideBrowserGlobalErrorListeners(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      tuiValidationErrorsProvider(TUI_VALIDATION_ERRORS),
      {
         provide: TUI_PASSWORD_TEXTS,
         useValue: of(['Pokaż hasło', 'Ukryj hasło']),
      },
   ],
};
