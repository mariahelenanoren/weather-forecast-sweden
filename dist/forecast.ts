async function getForecast() {
    const lon = chosenCity.lon
    const lat = chosenCity.lat
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function presentForecastData() {
    const data = await getForecast();
    presentForecastForToday(data)
}

function presentForecastForToday(data) {
    const cityTarget = document.querySelector("#name")
    cityTarget.innerHTML = chosenCity.name;
}
