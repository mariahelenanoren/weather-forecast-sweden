window.addEventListener("load", forecastMain);

function forecastMain() {
    loadLSIntoFavoritesList();
    presentForecastData();
    cityPickerMain();
    addEventListeners();
}

function addEventListeners() {
    const favorite = document.querySelector("#favorite")
    const stationPicker = document.querySelector("#station-btn")

    favorite.addEventListener("click", addOrRemoveFavorite)

    stationPicker.addEventListener("click", async function(event) {
        event.preventDefault();
        await setCity();
        presentForecastData()
        await presentSun();
    });
}