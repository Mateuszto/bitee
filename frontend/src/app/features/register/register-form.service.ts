import { Injectable, inject, signal, DestroyRef } from '@angular/core';
import {
   Validators,
   NonNullableFormBuilder,
   AbstractControl,
   ValidationErrors,
   Form,
   FormControl,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { finalize } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class RegisterFormService {
   private readonly formBuilder = inject(NonNullableFormBuilder);
   private readonly authService = inject(AuthService);
   private readonly alerts = inject(TuiAlertService);
   private readonly destroyRef = inject(DestroyRef);

   public readonly error = signal<string | null>(null);
   public readonly isLoading = signal<boolean>(false);
   public readonly currentStep = signal<number>(0);

   public readonly basicForm = this.formBuilder.group<{
      email: FormControl<string>;
      password: FormControl<string>;
   }>({
      email: this.formBuilder.control<string>('', {
         validators: [Validators.required, Validators.email],
      }),
      password: this.formBuilder.control<string>('', {
         validators: [Validators.required, this.passwordValidator.bind(this)],
      }),
   });

   public readonly companyForm = this.formBuilder.group<{
      country: FormControl<string>;
      nip: FormControl<string>;
      companyName: FormControl<string>;
      address: FormControl<string>;
      city: FormControl<string>;
      postalCode: FormControl<string>;
      phone: FormControl<string>;
      acceptTerms: FormControl<boolean>;
      acceptPrivacy: FormControl<boolean>;
      acceptMarketing: FormControl<boolean>;
      acceptAll: FormControl<boolean>;
   }>({
      country: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      nip: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      companyName: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      address: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      city: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      postalCode: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      phone: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      acceptTerms: this.formBuilder.control<boolean>(false, {
         validators: [Validators.requiredTrue],
      }),
      acceptPrivacy: this.formBuilder.control<boolean>(false, {
         validators: [Validators.requiredTrue],
      }),
      acceptMarketing: this.formBuilder.control<boolean>(false),
      acceptAll: this.formBuilder.control<boolean>(false),
   });

   public canProceedToNextStep(): boolean {
      return this.currentStep() === 0 ? this.basicForm.valid : false;
   }

   public setStep = (step: 0 | 1): void => {
      this.currentStep.set(step);
   };

   public submit = (): void => {
      if (this.companyForm.invalid) {
         this.companyForm.markAllAsTouched();
         return;
      }

      this.error.set(null);
      this.isLoading.set(true);

      const basicData = this.basicForm.getRawValue();
      const companyData = this.companyForm.getRawValue();
      const registerData = { ...basicData, ...companyData };

      this.authService
         .register(registerData)
         .pipe(
            finalize(() => this.isLoading.set(false)),
            takeUntilDestroyed(this.destroyRef),
         )
         .subscribe({
            next: () => {
               this.handleSuccess();
            },
            error: (err) => {
               this.handleError(err);
            },
         });
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
      this.companyForm.setErrors({ invalid: true });

      const errorMessage = err.message || 'Wystąpił błąd podczas rejestracji.';
      this.error.set(errorMessage);
      this.alerts.open(errorMessage, {
         label: 'Błąd rejestracji.',
         appearance: 'negative',
      });
   }

   private passwordValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;

      if (!value) {
         return null;
      }

      const errors: ValidationErrors = {};
      if (value.length < 8) {
         errors['minLength'] = true;
      }
      if (!/[a-z]/.test(value)) {
         errors['lowercase'] = true;
      }
      if (!/[A-Z]/.test(value)) {
         errors['uppercase'] = true;
      }
      if (!/\d/.test(value)) {
         errors['number'] = true;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
         errors['symbol'] = true;
      }

      return Object.keys(errors).length > 0 ? errors : null;
   }
}
