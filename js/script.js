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
}

dropdownInputDataThrower ();

dropdownButton.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown__list--hidden');
});

dropdownItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownButton.textContent = item.getAttribute('data-value'); 
        dropdownList.classList.toggle('dropdown__list--hidden');
        dataValueSetter ();
        dropdownInputDataThrower ();
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