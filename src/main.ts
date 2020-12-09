const dateToday = new Date();
const year = dateToday.getFullYear();
const month = dateToday.getMonth();
const date = dateToday.getDate();
const hour = dateToday.getTime();
interface chosenCity {
    name: String,
    lon: String,
    lat: String
}

const chosenCity = {
    name: "",
    lon: "",
    lat: ""
}

window.addEventListener("load", main);

function main() {
    loadLSIntoFavoritesList();
    displayFavorites();
    cityPickerMain();
    console.log(favoritesList)
    addEventListeners();
}

function addEventListeners() {
    const favorite = document.querySelector("#favorite")
    const stationPicker = document.querySelector("#station-btn")

    //favorite.addEventListener("click", addOrRemoveFavorite)

    /* stationPicker.addEventListener("click", async function(event) {
        event.preventDefault();
        await setCity();
        await presentForecastData();
        await showPreviousData();
        await presentSun();
    }); */
}