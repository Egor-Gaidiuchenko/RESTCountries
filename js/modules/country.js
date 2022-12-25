import {getData} from './services/services';
import {renderCountryDetailsPage} from './services/services';

function countries () {
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
}

export class Country {
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

export default countries;
