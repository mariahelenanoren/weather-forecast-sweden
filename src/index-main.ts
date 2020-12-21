window.addEventListener("load", (event)=> indexMain(event));

/** Function to be run on window load */
function indexMain(event: Event) {
    loadLSIntoFavoritesList();
    displayFavorites();
    cityPickerMain();
    setBackground();
    changeSearchFieldState(event);
    updateWelcomeSection()
}