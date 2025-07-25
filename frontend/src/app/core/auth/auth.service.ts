import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer, mergeMap } from 'rxjs';

export interface LoginCreadentials {
   email: string;
   password: string;
   rememberMe: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   public login(credentials: LoginCreadentials): Observable<boolean> {
      return this.simulateLogin(credentials);
   }

   private simulateLogin(credentials: LoginCreadentials): Observable<boolean> {
      const delayTime = Math.random() * 1000 + 1000;
      const isSuccess = Math.random() >= 0.5;

      return timer(delayTime).pipe(
         mergeMap(() => {
            if (isSuccess) {
               return of(true);
            } else {
               const error = {
                  error: 'Nieprawidłowe dane logowania',
                  message: 'Email lub hasło jest nieprawidłowe',
                  status: 401,
               };
               return throwError(() => error);
            }
         }),
      );
   }
}
