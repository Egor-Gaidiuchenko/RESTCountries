function searchingByName () {
    const searchField = document.querySelector('#search__country');

    searchField.addEventListener('focus', () => {
        const countriesCards = document.querySelectorAll('.country');
        
        searchField.addEventListener('input', () => {

            countriesCards.forEach(item => {
                if (!item.getAttribute('name').toLowerCase().includes(searchField.value)) {
                    item.classList.add('country--hidden');
                } else {
                    item.classList.remove('country--hidden');
                }
            });
        });
    });
}

export default searchingByName;