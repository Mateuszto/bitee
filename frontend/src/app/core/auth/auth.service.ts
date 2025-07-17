import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
   public login(email: string, password: string, rememberMe: boolean): Observable<boolean> {
      const isSuccess = Math.random() >= 0.5;
      return of(isSuccess).pipe(delay(1000));
   }
}
