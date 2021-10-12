import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

function countryMarkup(countries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = countries.map(({ name, capital, flag, population, languages }) => {
        return `<div class="country-info-card">
                <img src='${flag}' alt='${name} flag' width='200' />
                <h2>${name}</h2>
                <p><b>Capital</b>: ${capital}</p>
                <p><b>Population</b>: ${population}</p>
                <p><b>Languages</b>: ${languages.map(key => key.name)}</p>
            </div>`;
    }).join("");
}

function countriesMarkup(countries) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = countries.map(({ name, flag }) => {
        return `<li class="country-list-item">
                    <img src='${flag}' alt='${name} flag' width='100' />
                    <p><b>${name}</b></p>
                </li>`;
    }).join("");
}

const filterElems = function (e) {
    const inputData = refs.input.value.trim();
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    if (!inputData) {
        return
    }

    fetchCountries(inputData)
        .then(countries => {
            if (countries.length === 1) {
                return countryMarkup(countries)
            }

            if (countries.status === 404) {
                return Notiflix.Notify.info('Oops, there is no country with that name');
            }
            if (countries.length > 10) {
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }

            return countriesMarkup(countries);
        })
        .catch(error => {
            console.log(error)
        });
};

refs.input.addEventListener('input', debounce(filterElems, DEBOUNCE_DELAY));