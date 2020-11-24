function latestHourMain() {
    addEventListeners();
}

function addEventListeners() {
    const stationPicker = document.querySelector("#station-btn")
    stationPicker.addEventListener("click", (event) => {
        getData();
        event.preventDefault();
    })
}

async function getData() {
    try {
        const result = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station-set/all/period/latest-hour/data.json")
        const data = await result.json()
        console.log(data.station)
    } catch(error) {
    }
}