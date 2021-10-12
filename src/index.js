import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    img: document.querySelector('img')
};
const filterElems = function (e) {
    if (!e.target.value) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
    }
    return fetchCountries(e.target.value.trim())
        .then(countries => {
            refs.countryInfo.innerHTML = '';
            refs.countryList.innerHTML = '';
            if (countries.length === 1) {
                refs.countryInfo.innerHTML = `
            <ul class="list-group">
                <li class="list-group-item col-4"><img src ="${countries[0].flags.svg}"></li>
                <li class="list-group-item list-group-item-primary  col-4">${countries[0].name}</li>
                <li class="list-group-item col-4">${countries[0].capital}</li>
                <li class="list-group-item col-4">${countries[0].languages
                        .map(lang => lang.name)
                        .join(', ')}</li>
                <li  class="list-group-item  col-4">${countries[0].population}</li>
            </ul>
            `;
                refs.img.classList.add('img-thumbnail');
            } else if (countries.length >= 1 && countries.length <= 10) {
                let markup = countries
                    .map(
                        country => ` 
                <li class="h5 alert alert-primary col-5 text-light">
                <span class="col-5" 
                    style="width: 400px; 
                    height: 200px; 
                    background-size:cover; 
                    background-position:center; 
                    background-image: url(${country.flags.svg}); 
                    display:block" 
                </span>
                <mark>${country.name}<mark>
                </li>`,
                    ).join('');
                refs.countryList.insertAdjacentHTML('beforeend', markup);
                refs.countryList.style.listStyle = 'none';
            } else if (countries.length > 10) {
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        });
};
refs.input.addEventListener('input', debounce(filterElems, DEBOUNCE_DELAY));