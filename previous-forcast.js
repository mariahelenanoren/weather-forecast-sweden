async function getPreviousForecast() {
    const station = chosenStation.key
    try {
        const result = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/" + station + "/period/latest-months/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function showPreviousData() {
    const data = await getPreviousForecast();
    console.log(data)
}