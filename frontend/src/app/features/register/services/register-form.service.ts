import { Injectable, inject, DestroyRef } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterCoreStepFormService } from '../register-core-step/register-core-step-form.service';
import { RegisterCompanyStepFormService } from '../register-company-step/register-company-step-form.service';
import { RegisterStateService } from './register-state.service';

@Injectable()
export class RegisterFormService {
   private readonly authService = inject(AuthService);
   private readonly alerts = inject(TuiAlertService);
   private readonly destroyRef = inject(DestroyRef);
   private readonly coreForm = inject(RegisterCoreStepFormService);
   private readonly companyForm = inject(RegisterCompanyStepFormService);
   private readonly state = inject(RegisterStateService);

   public submit = (): void => {
      if (this.companyForm.form.invalid) {
         this.companyForm.form.markAllAsTouched();
         return;
      }

      this.state.error.set(null);
      this.state.isLoading.set(true);

      const coreData = this.coreForm.form.getRawValue();
      const { acceptAll, ...companyData } = this.companyForm.form.getRawValue();
      const registerData = { ...coreData, ...companyData };

      this.authService
         .register(registerData)
         .pipe(
            finalize(() => this.state.isLoading.set(false)),
            takeUntilDestroyed(this.destroyRef),
            catchError((err) => {
               this.handleError(err);
               return EMPTY;
            }),
         )
         .subscribe(() => this.handleSuccess());
   };

   private handleSuccess(): void {
      this.alerts
         .open('Rejestracja przebiegła pomyślnie!', {
            label: 'Witamy w Bitee!',
            appearance: 'positive',
         })
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe();
   }

   private handleError(err: any): void {
      this.companyForm.form.setErrors({ invalid: true });

      const errorMessage = err.message || 'Wystąpił błąd podczas rejestracji.';
      this.state.error.set(errorMessage);
      this.alerts.open(errorMessage, {
         label: 'Błąd rejestracji.',
         appearance: 'negative',
      });
   }
}
