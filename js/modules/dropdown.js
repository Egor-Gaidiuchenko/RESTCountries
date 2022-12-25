import { renderCountriesShort } from "./services/services";

function dropdown () {
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
}

export default dropdown;