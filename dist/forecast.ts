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
    const todaysData = data.timeSeries[0]
    console.log(todaysData)

    presentCityName()
    presentTemp(todaysData)
}

function presentTemp(todaysData) {
    const tempTarget = document.querySelector("#temp")
    const tempData = todaysData.parameters[1].values[0]
    tempTarget.innerHTML = formatDataWithDeg(tempData);
}

function presentCityName() {
    const cityTarget = document.querySelector("#name")
    cityTarget.innerHTML = chosenCity.name;
}

function formatDataWithDeg(data) {
    const formattedData = data + "&deg;"
    return formattedData;
}
