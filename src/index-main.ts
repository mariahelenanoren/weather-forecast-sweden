window.addEventListener("load", indexMain);

function indexMain() {
    loadLSIntoFavoritesList();
    displayFavorites();
    cityPickerMain();
    addEventListenersIndex();
    setBackgroundImage();
}

function addEventListenersIndex() {
    const stationPicker = document.querySelector("#station-btn")

    stationPicker.addEventListener("click", async function() {
        await setCity();
    });
}