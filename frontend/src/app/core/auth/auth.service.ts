import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer, mergeMap } from 'rxjs';

export interface LoginCreadentials {
   email: string;
   password: string;
   rememberMe: boolean;
}

export interface RegisterData {
   email: string;
   password: string;
   country: string;
   nip: string;
   companyName: string;
   address: string;
   city: string;
   postalCode: string;
   phone: string;
   acceptTerms: boolean;
   acceptPrivacy: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   public login(credentials: LoginCreadentials): Observable<boolean> {
      return this.simulateLogin(credentials);
   }

   public register(data: RegisterData): Observable<boolean> {
      return this.simulateRegister(data);
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

   private simulateRegister(data: RegisterData): Observable<boolean> {
      const delayTime = Math.random() * 1500 + 1500;
      const isSuccess = Math.random() >= 0.3;

      return timer(delayTime).pipe(
         mergeMap(() => {
            if (isSuccess) {
               return of(true);
            } else {
               const error = {
                  error: 'Błąd rejestracji',
                  message: 'Nie udało się zarejestrować konta. Spróbuj ponownie.',
                  status: 400,
               };
               return throwError(() => error);
            }
         }),
      );
   }
}
