import { Injectable, inject, signal } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoginFormService {
   private readonly formBuilder = inject(NonNullableFormBuilder);
   private readonly authService = inject(AuthService);

   public readonly error = signal<string | null>(null);
   public readonly isLoading = signal<boolean>(false);

   public readonly form = this.formBuilder.group({
      email: this.formBuilder.control<string>('', {
         validators: [Validators.required, Validators.email],
      }),
      password: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      rememberMe: this.formBuilder.control<boolean>(false),
   });

   public submit(): Observable<boolean> {
      if (this.form.invalid) {
         return new Observable<boolean>((subscriber) => {
            subscriber.error('Form is invalid');
         });
      }

      this.error.set(null);
      this.isLoading.set(true);
      const { email, password, rememberMe } = this.form.getRawValue();
      return this.authService.login({ email, password, rememberMe }).pipe(
         tap(() => {
            this.isLoading.set(false);
         }),
      );
   }
}
