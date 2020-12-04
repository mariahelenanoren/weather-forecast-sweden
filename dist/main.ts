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
    cityPickerMain();
    addEventListeners();
}

function addEventListeners() {
    const stationPicker = document.querySelector("#station-btn")

    stationPicker.addEventListener("click", async function(event) {
        event.preventDefault();
        await setCity();
        await presentForecastData();
        await showPreviousData();
        await presentSun();
    });
}