// Services

const getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error (`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
};

// Dropdown

const dropdownButton = document.querySelector('.dropdown__button'),
      dropdownList = document.querySelector('.dropdown__list'),
      dropdownItems = document.querySelectorAll('.dropdown__list-item'),
      dropdownInput = document.querySelector('.dropdown__input--hidden');

function dataValueSetter () {
    dropdownButton.setAttribute('data-value', `${dropdownButton.textContent}`);
}

dataValueSetter ();

function dropdownInputDataThrower () {
    dropdownInput.setAttribute('value', `${dropdownButton.getAttribute('data-value')}`);
    renderCountriesShort (dropdownInput.getAttribute('value').toLowerCase());
}

dropdownInputDataThrower ();

dropdownButton.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown__list--hidden');
});

dropdownItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();

        if (item.getAttribute('data-value') !== dropdownButton.getAttribute('data-value')) {
            dropdownButton.textContent = item.getAttribute('data-value'); 
            dropdownList.classList.toggle('dropdown__list--hidden');
            dataValueSetter ();
            dropdownInputDataThrower ();
        } else {
            dropdownList.classList.toggle('dropdown__list--hidden');
        }     
    });
});

document.addEventListener('click', (event) => {
    if (event.target !== dropdownButton) {
        dropdownList.classList.add('dropdown__list--hidden');
    }
});

// Dark Theme

const darkTheme = document.querySelector('.dark-theme'),
      darkThemebutton = document.querySelector('.header__dark-mode-button');
      
darkThemebutton.addEventListener('click', () => {
    if (darkTheme.getAttribute('href') !== '/css/dark.css') {
        darkTheme.setAttribute('href', '/css/dark.css');
    } else {
        darkTheme.setAttribute('href', '');
    }
});

// Country class
class Country {
    constructor (name, flag, population, region, capital, code, nativeName, subRegion, domain, currencies, languages, borders, commonName) {
        this.name = name;
        this.flag = flag;
        this.population = population;
        this.region = region;
        this.capital = capital;
        this.nativeName = nativeName;
        this.subRegion = subRegion;
        this.domain = domain;
        this.currencies = currencies;
        this.languages = languages;
        this.borders = borders;
        this.code = code;
        this.commonName = commonName;
    }

    renderCountryShort () {
        const element = document.createElement('div'),
              parent = document.querySelector('.countries');

        element.classList.add('country');

        element.innerHTML = `
            <img src="${this.flag}" alt="flag" class="country__flag">
            <div class="country__info">
                <h1 class="country__name">${this.name}</h1>
                <h2 class="country__value"><span class="country__value--title">Population: </span>${this.population}</h2>
                <h2 class="country__value"><span class="country__value--title">Region: </span>${this.region}</h2>
                <h2 class="country__value"><span class="country__value--title">Capital: </span>${this.capital}</h2>
            </div>
        `;

        element.setAttribute('code', `${this.code}`);
        element.setAttribute('name', `${this.name}`);

        parent.append(element);
    }

    renderCountryDetails () {
        const element = document.createElement('div'),
              parent = document.querySelector('.country-details');

        element.classList.add('country-information');

        element.innerHTML = `
            <img src="${this.flag}" alt="flag" class="country-information__flag">
            <div class="country-information__details">
                <h1 class="country-information__name">${this.name}</h1>
                <div class="country-information__info">
                    <h2 class="country-information__value"><span class="country-information__value--title">Native Name: </span>${this.nativeName}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Population: </span>${this.population}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Region: </span>${this.region}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Sub Region: </span>${this.subRegion}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Capital: </span>${this.capital}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Top Level Domain: </span>${this.domain}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Currencies: </span>${this.currencies}</h2>
                    <h2 class="country-information__value"><span class="country-information__value--title">Languages: </span>${this.languages}</h2>
                </div>
            </div>
        `;

        parent.append(element);
        
        if (this.borders) {
            const borders = document.createElement('div'),
                  bordersParent = document.querySelector('.country-information__details');
            
            borders.classList.add('country-information__border-countries');

            borders.innerHTML = `
                <span class="country-information__border-countries--title">Border Countries:</span> 
            `;

            bordersParent.append(borders);
            
            let borderCountries = [];
            
            this.borders.forEach(code => {
                getData(`https://restcountries.com/v3.1/alpha/${code}`)
                    .then(data => {
                        let countryName = data[0].name.common;
                            
                        const borderCountry = document.createElement('div');

                        borderCountry.classList.add('country-information__border-country');

                        borderCountry.textContent = countryName;

                        borderCountry.setAttribute('code', `${code}`);

                        borderCountries.push(borderCountry);

                        borders.append(borderCountry);
                    });
            });

            borders.addEventListener('click', (event) => {
                const target = event.target,
                      countryDetailsPage = document.querySelector('.country-information');

                if (target.classList.contains('country-information__border-country')) {
                    countryDetailsPage.remove();
                    renderCountryDetailsPage(target.getAttribute('code'));
                }
            });
        }   
    }

}

// Render countries by region

function renderCountriesShort(region) {
    const countries = document.querySelectorAll('.country');

    countries.forEach(item => {
        item.remove();
    });

    let url;

    if (region === 'all regions') {
        url = 'https://restcountries.com/v3.1/all';
    } else {
        url = `https://restcountries.com/v3.1/region/${region}`;
    }

    getData(url)
        .then((data) => {
            data.forEach(item => {
                let name = item.name.official,
                    flag = item.flags.svg,
                    population = item.population,
                    region = item.region,
                    capital = item.capital,
                    code = item.cca3;

                new Country(name, flag, population, region, capital, code).renderCountryShort();
            });
        });
} 

// Show Details

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

function renderCountryDetailsPage (code) {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;

    getData(url)
        .then((data) => {
            data.forEach(item => {
                let name = item.name.official,
                    flag = item.flags.svg,
                    population = item.population,
                    region = item.region,
                    capital = item.capital,
                    nativeName = item.name.nativeName[Object.keys(item.name.nativeName)[0]].official,
                    subRegion = item.subregion,
                    domain = item.tld.join(' , '),
                    currencies = Object.values(item.currencies)[0].name,
                    languages = Object.values(item.languages).join(' , '),
                    borders = item.borders,
                    commonName = item.name.common;

                    if (Object.values(item.currencies).length > 1) {
                        currencies = [Object.values(item.currencies)[0].name, Object.values(item.currencies)[1].name].join(' , ');
                    }

                new Country(name, flag, population, region, capital, code, nativeName, subRegion, domain, currencies, languages, borders, commonName).renderCountryDetails();
            });
        });
}

// Search by name

const searchField = document.querySelector('#search__country');

searchField.addEventListener('focus', () => {
    const countriesCards = document.querySelectorAll('.country');
    
    searchField.addEventListener('input', () => {
        console.log(searchField.value)
        countriesCards.forEach(item => {
            if (!item.getAttribute('name').toLowerCase().includes(searchField.value)) {
                item.classList.add('country--hidden');
            } else {
                item.classList.remove('country--hidden');
            }
        });
    });
});