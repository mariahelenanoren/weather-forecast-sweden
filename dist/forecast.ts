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
    presentVisibility(todaysData)
    presentHumidity(todaysData)
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
    const formattedData = Math.round(data) + "&deg;"
    return formattedData;
}

function presentVisibility(data) {
    const visibilityTarget = document.querySelector("#visibility")
    const visibilityData = data.parameters[2].values[0]
    visibilityTarget.innerHTML = visibilityData + " km"
}

function presentHumidity(data) {
    const humidityTarget = document.querySelector("#humidity")
    const humidityData = data.parameters[5].values[0]
    humidityTarget.innerHTML = humidityData + "&#37;" 
}
