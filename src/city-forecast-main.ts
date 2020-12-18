window.addEventListener("load", forecastMain);

function forecastMain() {
    loadLSIntoFavoritesList();
    presentSun()
    presentForecastData();
    addEventListeners();
    cityPickerMain();
    setBackgroundImage();
    parseSvenskaStader();
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