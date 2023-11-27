import {
    Country,
    getCountries,
    getCountryCallingCode,
} from "react-phone-number-input";
import labels from "react-phone-number-input/locale/en";

export const countryOptions = getCountries().map((country: Country) => {
    return {
        value: {
            id: country,
            value: labels[country] + " +" + getCountryCallingCode(country),
        },
    };
});
