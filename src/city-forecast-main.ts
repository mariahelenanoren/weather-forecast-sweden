window.addEventListener("load", (event) => forecastMain(event));

function forecastMain(event: Event) {
    loadLSIntoFavoritesList();
    loadLSIntoChosenCity()
    presentSun()
    presentForecastData();
    addEventListeners();
    cityPickerMain();
    setBackgroundImage();
    changeSearchFieldState(event)
}

function addEventListeners() {
    const favorite = document.querySelector("#favorite")

    favorite.addEventListener("click",() => addOrRemoveFavorite(chosenCity.locality, chosenCity.municipality))
}