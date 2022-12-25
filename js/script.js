import darkTheme from './modules/darkTheme';
import dropdown from './modules/dropdown';
import renderCountryDetailsPages from './modules/renderDetailsPages';
import countries from './modules/country';
import searchingByName from './modules/searchingByName';

document.addEventListener('DOMContentLoaded', () => { 
    darkTheme();
    dropdown();
    renderCountryDetailsPages();
    countries();
    searchingByName();
});