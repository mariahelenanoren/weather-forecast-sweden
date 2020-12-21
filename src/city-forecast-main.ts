window.addEventListener("load", (event) => forecastMain(event));

/**
 * Functions to be run on window load
 */
function forecastMain(event: Event) {
    loadLSIntoFavoritesList();
    loadLSIntoChosenCity()
    presentSun()
    presentForecastData();
    addEventListeners();
    cityPickerMain();
    setBackground();
    changeSearchFieldState(event)
}

/** Sets event listeners */
function addEventListeners() {
    const favorite = document.querySelector("#favorite")

    favorite.addEventListener("click",() => addOrRemoveFavorite(chosenCity.locality, chosenCity.municipality))
}