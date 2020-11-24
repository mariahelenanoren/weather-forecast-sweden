let chosenStationKey;

window.addEventListener("load", main);

function main() {
    stationPickerMain();
    latestHourMain();
    //weatherMain();
    addEventListeners();
}

function addEventListeners() {
    const stationPicker = document.querySelector("#station-btn")
    stationPicker.addEventListener("click", (event) => {
        getLatestHourData();
        getForecast();
        event.preventDefault();
    })
}