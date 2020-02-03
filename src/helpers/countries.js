import { countries as countriesList } from 'countries-list'
import { unsupportedCountries } from '@/constants/unsupported-countries'

export const supportedCountries = Object
  .keys(countriesList)
  .map((key) => {
    return ({
      value: countriesList[key].name,
      text: countriesList[key].name,
      phone: countriesList[key].phone,
      code: key,
    })
  })
  .sort((a, b) => {
    if (a.value < b.value) { return -1 }
    if (a.value > b.value) { return 1 }
    return 0
  })
  .filter(({ value }) => !unsupportedCountries.includes(value));

export const getCodeByCountryName = (countryName) => {
  const [country] = supportedCountries.filter(({ text }) => text === countryName);
  return country.code
};
