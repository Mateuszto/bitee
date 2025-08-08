import { computed, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class LoginState {
   public readonly error = computed(() => this.state().error);
   public readonly isLoading = computed(() => this.state().isLoading);

   private state: WritableSignal<any> = signal({
      isLoading: false,
      error: '',
   })

   setLoading(isLoading: boolean): void {
      this.state.update((state: any) => ({ ...state, isLoading }));
   }

   setError(error: string): void {
      this.state.update((state: any) => ({ ...state, error }));
   }
}
