import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { RegisterCoreStepFormService } from './services/register-core-step-form-service';
import { RegisterStep } from './models/register-step-enum';

@Injectable()
export class RegisterState {
   private readonly coreForm = inject(RegisterCoreStepFormService);

   public readonly error = computed(() => this.state().error);
   public readonly isLoading = computed(() => this.state().isLoading);
   public readonly currentStep = computed(() => this.state().currentStep);

   private state: WritableSignal<any> = signal({
      isLoading: false,
      error: '',
      currentStep: RegisterStep.CORE,
   });

   public setLoading(isLoading: boolean): void {
      this.state.update((state: any) => ({ ...state, isLoading }));
   }

   public setError(error: string): void {
      this.state.update((state: any) => ({ ...state, error }));
   }

   public canProceedToNextStep(): boolean {
      return this.currentStep() === RegisterStep.CORE ? this.coreForm.form.valid : false;
   }

   public setCurrentStep = (currentStep: RegisterStep): void => {
      this.state.update((state: any) => ({ ...state, currentStep }));
   };
}
