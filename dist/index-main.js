window.addEventListener("load", function (event) { return indexMain(event); });
/** Function to be run on window load */
function indexMain(event) {
    loadLSIntoFavoritesList();
    displayFavorites();
    cityPickerMain();
    setBackground();
    changeSearchFieldState(event);
    updateWelcomeSection();
}
