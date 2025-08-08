import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { RegisterCoreForm } from '../models/register-core-form';
import { passwordValidator } from '../../../shared/validators/password.validator';

@Injectable()
export class RegisterCoreStepFormService {
   private readonly formBuilder = inject(NonNullableFormBuilder);

   public readonly form = this.formBuilder.group<RegisterCoreForm>({
      email: this.formBuilder.control<string>('', {
         validators: [Validators.required, Validators.email],
      }),
      password: this.formBuilder.control<string>('', {
         validators: [Validators.required, passwordValidator()],
      }),
   });
}
