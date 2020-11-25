const chosenCity = {
}

window.addEventListener("load", main);

function main() {
    stationPickerMain();
    addEventListeners();
}

function addEventListeners() {
    const stationPicker = document.querySelector("#station-btn")

    stationPicker.addEventListener("click", function(event) {
        event.preventDefault();
        setCity();
        setTimeout( function() {
            showData();
            showPreviousData();
        }, 100)
    });
}