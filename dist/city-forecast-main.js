window.addEventListener("load", function (event) { return forecastMain(event); });
/**
 * Functions to be run on window load
 */
function forecastMain(event) {
    loadLSIntoFavoritesList();
    loadLSIntoChosenCity();
    presentSun();
    presentForecastData();
    addEventListeners();
    cityPickerMain();
    setBackground();
    changeSearchFieldState(event);
}
/** Sets event listeners */
function addEventListeners() {
    var favorite = document.querySelector("#favorite");
    favorite.addEventListener("click", function () { return addOrRemoveFavorite(chosenCity.locality, chosenCity.municipality); });
}
