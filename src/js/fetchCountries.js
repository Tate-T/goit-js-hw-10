const baseUrl = 'https://restcountries.com/v2/name/';
import Notiflix from 'notiflix';

export const fetchCountries = (inputData) => {
    return fetch(`${baseUrl}${inputData}?fields=name,capital,population,flag,languages`)
        .then(response => {
            if (!(response.status >= 200) && !(response.status < 300)) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            return data;
        });
};