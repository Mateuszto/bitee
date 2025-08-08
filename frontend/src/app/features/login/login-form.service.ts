import { Injectable, inject, signal, DestroyRef } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { finalize, catchError, EMPTY } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class LoginFormService {
   private readonly formBuilder = inject(NonNullableFormBuilder);
   private readonly authService = inject(AuthService);
   private readonly alerts = inject(TuiAlertService);
   private readonly destroyRef = inject(DestroyRef);

   public readonly error = signal<string | null>(null);
   public readonly isLoading = signal<boolean>(false);

   public readonly form = this.formBuilder.group({
      email: this.formBuilder.control<string>('', {
         validators: [Validators.required, Validators.email],
      }),
      password: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      rememberMe: this.formBuilder.control<boolean>(false),
   });

   public submit(): void {
      if (this.form.invalid) {
         this.form.markAllAsTouched();
         return;
      }

      this.error.set(null);
      this.isLoading.set(true);
      const { email, password, rememberMe } = this.form.getRawValue();
      this.authService
         .login({ email, password, rememberMe })
         .pipe(
            finalize(() => this.isLoading.set(false)),
            takeUntilDestroyed(this.destroyRef),
            catchError((err) => {
               this.handleError(err);
               return EMPTY;
            })
         )
         .subscribe(() => this.handleSuccess());
   }

   private handleSuccess(): void {
      this.alerts
         .open('Cześć {nazwa użytkownika}', {
            label: 'Zalogowano pomyślnie!',
            appearance: 'positive',
         })
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe();
   }

   private handleError(err: any): void {
      this.form.setErrors({ invalid: true });

      const errorMessage = err.message || 'Wystąpił błąd podczas logowania.';
      this.error.set(errorMessage);
      this.alerts.open(errorMessage, {
         label: 'Błąd logowania.',
         appearance: 'negative',
      });
   }
}
