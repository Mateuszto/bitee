import { Injectable, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginFormService {
   private authService = inject(AuthService);

   public readonly form = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required]),
      rememberMe: new FormControl<boolean>(false),
   });

   public get email() {
      return this.form.get('email');
   }

   public get password() {
      return this.form.get('password');
   }

   public get rememberMe() {
      return this.form.get('rememberMe');
   }

   public submit(): Observable<boolean> {
      if (this.form.invalid) {
         return new Observable<boolean>((subscriber) => {
            subscriber.error('Form is invalid');
         });
      }

      const { email, password, rememberMe } = this.form.value;
      return this.authService.login(email!, password!, rememberMe!);
   }
}
