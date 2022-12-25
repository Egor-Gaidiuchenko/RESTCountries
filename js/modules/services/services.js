const getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error (`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
};

export {getData};

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

export {renderCountriesShort};

import { Country } from "../country";

const renderCountryDetailsPage = function (code) {
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
};

export {renderCountryDetailsPage};