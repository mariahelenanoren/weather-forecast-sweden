function latestHourMain() {
}

async function getLatestHourData() {
    try {
        const result = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station-set/all/period/latest-hour/data.json")
        const data = await result.json()
        console.log(data.station)
    } catch(error) {
    }
}

async function getForecast() {
    const lon = chosenStation.lon
    const lat = chosenStation.lat
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        console.log(data)
    } catch(error) {
    }
}