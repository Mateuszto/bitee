import { DestroyRef, inject, Injectable } from '@angular/core';
import { AuthService, RegisterData } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification-service';
import { RegisterState } from '../register-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';

@Injectable()
export class RegisterActionsService {
   private readonly notificationService = inject(NotificationService);
   private readonly authService = inject(AuthService);
   private readonly registerState = inject(RegisterState);
   private readonly destroyRef = inject(DestroyRef);

   public submit(args: any): void {
      this.registerState.setError('');
      this.registerState.setLoading(true);

      this.authService
         .register(args)
         .pipe(
            takeUntilDestroyed(this.destroyRef),
            catchError((_) => {
               this.registerState.setLoading(false);
               this.notificationService.showError({
                  content: 'Wystąpił błąd podczas rejestracji.',
                  label: 'Błąd rejestracji.',
               });
               return EMPTY;
            }),
         )
         .subscribe(() => {
            this.registerState.setLoading(false);
            this.notificationService.showSuccess({
               content: 'Rejestracja przebiegła pomyślnie!',
               label: 'Witamy w Bitee!',
            });
         });
   }
}
