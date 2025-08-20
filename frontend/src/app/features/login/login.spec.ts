import { LoginComponent } from './login';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Login Component', () => {
   describe('Submit button', () => {
      it('should be disabled when form is invalid', () => {
         const { fixture, debugElement } = setup();
         const buttonDebugElement = debugElement.query(By.css('[data-testingId="submitButton"]'));

         expect(buttonDebugElement.nativeElement.getAttribute('disabled')).not.toBeNull();

         const emailInput = debugElement.query(By.css('[data-testingId="emailInput"]'));
         const passwordInput = debugElement.query(By.css('[data-testingId="passwordInput"]'));
         emailInput.nativeElement.value = 'invalid-email';
         passwordInput.nativeElement.value = 'short';

         fixture.detectChanges();

         expect(buttonDebugElement.nativeElement.getAttribute('disabled')).not.toBeNull();
      });

      it('should be enabled when form is valid', () => {
         const { fixture, debugElement } = setup();

         const buttonDebugElement = debugElement.query(By.css('[data-testingId="submitButton"]'));
         const emailInput = debugElement.query(By.css('[data-testingId="emailInput"]'));
         const passwordInput = debugElement.query(By.css('[data-testingId="passwordInput"]'));

         emailInput.nativeElement.value = 'validemail@mail.com';
         passwordInput.nativeElement.value = 'validPassword123';

         fixture.detectChanges();

         expect(buttonDebugElement.nativeElement.getAttribute('disabled')).toBeFalsy();
      })
   })

   // describe('Submit form', () => {
   //    it('should mark form as dirty when data are invalid', () => {
   //       const { fixture, debugElement, component } = setup();
   //       const formDebugElement = debugElement.query(By.css('form'));
   //
   //       const emailInput = debugElement.query(By.css('[data-testingId="emailInput"]'));
   //       const passwordInput = debugElement.query(By.css('[data-testingId="passwordInput"]'));
   //       emailInput.nativeElement.value = 'invalid-email';
   //       passwordInput.nativeElement.value = 'short';
   //    })
   // })
});

const setup = () => {
   TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
         {
            provide: ActivatedRoute,
            useValue: {
               params: of({}),
               queryParams: of({}),
               snapshot: {
                  params: {},
                  queryParams: {},
               },
            },
         },
      ],
   });
   const fixture = TestBed.createComponent(LoginComponent);
   const debugElement = fixture.debugElement;
   const component = fixture.componentInstance;

   fixture.detectChanges();

   return { fixture, debugElement, component };
};
