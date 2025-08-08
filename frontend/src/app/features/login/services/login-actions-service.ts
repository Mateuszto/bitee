import { DestroyRef, inject, Injectable } from '@angular/core';
import { LoginState } from '../login-state';
import { AuthService } from '../../../core/auth/auth.service';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../core/services/notification-service';

@Injectable()
export class LoginActionsService {
   private readonly authService = inject(AuthService);
   private readonly loginStateService = inject(LoginState);
   private readonly notificationService = inject(NotificationService);
   private readonly destroyRef = inject(DestroyRef);

   public submit(args: {
      email: string;
      password: string;
      rememberMe: boolean;
   }): void {
      this.loginStateService.setLoading(true);
      this.loginStateService.setError('');

      const { email, password, rememberMe } = args;

      this.authService
         .login( {email, password, rememberMe} )
         .pipe(
            takeUntilDestroyed(this.destroyRef),
            catchError(_ => {
               this.notificationService.showError({
                  content: 'Wystąpił błąd podczas logowania.',
                  label: 'Błąd logowania',
               })
               this.loginStateService.setError('Wystąpił błąd podczas logowania.');
               this.loginStateService.setLoading(false);
               return EMPTY;
            })
         )
         .subscribe(() => {
            this.loginStateService.setLoading(false);
            this.notificationService.showSuccess({
               content: 'Cześć {nazwa użytkownika}',
               label: 'Zalogowano pomyślnie!',
            })
         });
   }
}
