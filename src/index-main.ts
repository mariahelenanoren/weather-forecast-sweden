window.addEventListener("load", (event)=> indexMain(event));

function indexMain(event: Event) {
    loadLSIntoFavoritesList();
    displayFavorites();
    cityPickerMain();
    setBackgroundImage();
    changeSearchFieldState(event);
}