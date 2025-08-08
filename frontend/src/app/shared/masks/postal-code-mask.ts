import { MaskitoOptions } from '@maskito/core';

export const postalCodeMask: MaskitoOptions = {
   mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
};
