import { MaskitoOptions } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import { CountryCode } from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

export function phoneMask(countryCode: CountryCode): MaskitoOptions {
   return {
      ...maskitoPhoneOptionsGenerator({
         countryIsoCode: countryCode,
         metadata,
         strict: true,
      }),
   };
}
