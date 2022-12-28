function darkTheme () {
    const darkTheme = document.querySelector('.dark-theme'),
      darkThemebutton = document.querySelector('.header__dark-mode-button');
        
    darkThemebutton.addEventListener('click', () => {
        if (darkTheme.getAttribute('href') !== './css/dark.css') {
            darkTheme.setAttribute('href', './css/dark.css');
        } else {
            darkTheme.setAttribute('href', '');
        }
    });
}

export default darkTheme;