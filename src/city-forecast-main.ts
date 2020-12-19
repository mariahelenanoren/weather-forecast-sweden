window.addEventListener("load", forecastMain);

function forecastMain() {
    loadLSIntoFavoritesList();
    loadLSIntoChosenCity()
    presentSun()
    presentForecastData();
    addEventListeners();
    cityPickerMain();
    setBackgroundImage();
}

function addEventListeners() {
    const favorite = document.querySelector("#favorite")

    favorite.addEventListener("click",() => addOrRemoveFavorite(chosenCity.locality, chosenCity.municipality))
}