import { Injectable, inject, signal, DestroyRef } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { finalize, catchError, EMPTY } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../core/services/notification-service';

@Injectable()
export class LoginFormService {
   private readonly formBuilder = inject(NonNullableFormBuilder);

   public readonly form = this.formBuilder.group({
      email: this.formBuilder.control<string>('', {
         validators: [Validators.required, Validators.email],
      }),
      password: this.formBuilder.control<string>('', { validators: [Validators.required] }),
      rememberMe: this.formBuilder.control<boolean>(false),
   });
}
