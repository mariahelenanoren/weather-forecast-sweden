window.addEventListener("load", forecastMain);

function forecastMain() {
    loadLSIntoFavoritesList();
    loadLSIntoChosenCity();
    presentSun()
    presentForecastData();
    cityPickerMain();
    addEventListeners();
}

function addEventListeners() {
    const favorite = document.querySelector("#favorite")
    const stationPicker = document.querySelector("#station-btn")

    favorite.addEventListener("click",() => addOrRemoveFavorite(chosenCity.name))

    stationPicker.addEventListener("click", function() {
        setCity();
        presentForecastData()
        presentSun();
    });
}