async function getForecast() {
    const lon = chosenStation.lon
    const lat = chosenStation.lat
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function showData() {
    const data = await getForecast();
    console.log(data)
}