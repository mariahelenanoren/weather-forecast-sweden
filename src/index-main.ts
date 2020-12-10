window.addEventListener("load", indexMain);

function indexMain() {
    loadLSIntoFavoritesList();
    displayFavorites();
    cityPickerMain();
    addEventListenersIndex();
}

function addEventListenersIndex() {
    const favorite = document.querySelector("#favorite")
    const stationPicker = document.querySelector("#station-btn")

    favorite.addEventListener("click", addOrRemoveFavorite)

    stationPicker.addEventListener("click", async function(event) {
        event.preventDefault();
        await setCity();
        await presentForecastData();
        await showPreviousData();
        await presentSun();
    });
}