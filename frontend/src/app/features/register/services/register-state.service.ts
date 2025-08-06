import { inject, Injectable, signal } from '@angular/core';
import { RegisterCoreStepFormService } from '../register-core-step/register-core-step-form.service';

@Injectable()
export class RegisterStateService {
   private readonly coreForm = inject(RegisterCoreStepFormService);

   public readonly error = signal<string | null>(null);
   public readonly isLoading = signal<boolean>(false);
   public readonly currentStep = signal<number>(0);

   public canProceedToNextStep(): boolean {
      return this.currentStep() === 0 ? this.coreForm.form.valid : false;
   }

   public setStep = (step: 0 | 1): void => {
      this.currentStep.set(step);
   };
}
