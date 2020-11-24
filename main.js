const chosenStation = {
}

window.addEventListener("load", main);

function main() {
    stationPickerMain();
    latestHourMain();
    //weatherMain();
    addEventListeners();
}

function addEventListeners() {
    const stationPicker = document.querySelector("#station-btn")

    stationPicker.addEventListener("click", function(event) {
        event.preventDefault();
        setStation();
        getLatestHourData();
        setTimeout( function() {
            getForecast();
        }, 100)
    });
}