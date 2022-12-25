import {renderCountryDetailsPage} from './services/services';

function renderCountryDetailsPages () {
    const countries = document.querySelector('.countries'),
      searchForm = document.querySelector('.search'),
      countryDetails = document.querySelector('.country-details'),
      backButton = document.querySelector('.country-details__back-button');
      

    countries.addEventListener('click', (event) => {
        const target = event.target.parentElement;

        if (target.classList.contains('country')) {
            searchForm.classList.add('search--hidden');
            countryDetails.classList.remove('country-details--hidden');
            countries.classList.add('countries--hidden');
            renderCountryDetailsPage(target.getAttribute('code'));
        }
    });

    backButton.addEventListener('click', () => {
        const countryDetailsPage = document.querySelector('.country-information');

        countryDetailsPage.remove();
        searchForm.classList.remove('search--hidden');
        countryDetails.classList.add('country-details--hidden');
        countries.classList.remove('countries--hidden');
    });
}

export default renderCountryDetailsPages;