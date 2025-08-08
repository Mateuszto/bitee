export const TUI_VALIDATION_ERRORS = {
   required: 'To pole jest wymagane',
   email: 'Wprowadź poprawny adres e-mail',
   postalCodeFormat: 'Wprowadź poprawny kod pocztowy',
   requiredTrue: 'Zgoda jest wymagana',
   passwordMinLength: 'Hasło musi mieć co najmniej 8 znaków',
   passwordLowercase: 'Hasło musi zawierać co najmniej jedną małą literę',
   passwordUppercase: 'Hasło musi zawierać co najmniej jedną wielką literę',
   passwordNumber: 'Hasło musi zawierać co najmniej jedną cyfrę',
   passwordSymbol: 'Hasło musi zawierać co najmniej jeden znak specjalny',
   nipFormat: 'Wprowadź poprawny NIP',
   phoneFormat: 'Wprowadź poprawny numer telefonu',
} as const;

export type TuiValidationErrorKey = keyof typeof TUI_VALIDATION_ERRORS;
