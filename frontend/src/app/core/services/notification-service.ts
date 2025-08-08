import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
   providedIn: 'root',
})
export class NotificationService {
   private readonly alerts = inject(TuiAlertService);
   private readonly destroyRef = inject(DestroyRef);

   public showSuccess(args: { content: string; label?: string }): void {
      const { content, label } = args;
      this.alerts
         .open(content, {
            label: label,
            appearance: 'positive',
         })
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe();
   }

   public showError(args: { content: string; label?: string }): void {
      const { content, label } = args;
      this.alerts
         .open(content, {
            label: label,
            appearance: 'negative',
         })
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe();
   }
}
