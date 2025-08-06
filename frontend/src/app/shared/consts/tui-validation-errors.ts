export const TUI_VALIDATION_ERRORS = {
   required: 'To pole jest wymagane',
   email: 'Wprowadź poprawny adres e-mail',
} as const;

export type TuiValidationErrorKey = keyof typeof TUI_VALIDATION_ERRORS;