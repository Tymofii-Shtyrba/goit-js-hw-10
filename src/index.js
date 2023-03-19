import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countyCard: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSerchCountries, DEBOUNCE_DELAY));

function onSerchCountries(event) {
  const searchFieldValue = event.target.value.trim();
  refs.countriesList.innerHTML = '';
  refs.countyCard.innerHTML = '';

  if (searchFieldValue) {
    
    fetchCountries(searchFieldValue)
      .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (countries.length < 10 && countries.length >= 2) {
        makeCountriesList(countries);
      }
      if (countries.length === 1) {
        makeCountryCard(countries[0])
      }
    })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name'); 
      })
  }

}

function makeCountriesList(countries) {
  const listItems = [];
  for (const country of countries) {
    const flag = country.flags.svg;
    const name = country.name.official;
    listItems.push(`<li><img src='${flag}' width='30px' class='flag-icon' alt='flag of ${name}'>${name}</li>`);
  }
  refs.countriesList.innerHTML = listItems.join('');
}
  

  
function makeCountryCard(country) {
  
  const flag = country.flags.svg;
  const name = country.name.official;
  const capital = country.capital[0];
  const population = country.population;
  const languages = Object.values(country.languages).join(', ');
  
  
  refs.countyCard.innerHTML =
    `<img src=${flag} width="50px" class="flag-icon" alt="flag of ${name}"><span class="country-card-name">${name}</span>
    <p><span class='row-header'>Capital: </span>${capital}</p>
    <p><span class='row-header'>Population: </span>${population}</p>
    <p><span class='row-header'>Languages: </span>${languages}</p>`;
}