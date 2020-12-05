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
    presentExpTemp(todaysData)
}

function presentTemp(data) {
    const tempTarget = document.querySelector("#temp")
    const tempData = data.parameters[1].values[0]
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

function presentExpTemp(data) {
    const expTempTarget = document.querySelector("#exp-temp")
    const tempData = data.parameters[1].values[0]
    const windData = data.parameters[4].values[0]
    const expTemp = calculateExpTemp(tempData, windData)
    expTempTarget.innerHTML = expTemp + "&deg;C"
}

function calculateExpTemp(tempData, windData) {
    tempData = Math.round(tempData)
    let expTemp = 13.12 + (0.6215 * tempData) - (13.956 * Math.pow(windData, 0.16)) + (0.48669 * tempData * Math.pow(windData, 0.16)) // Wind chill formula from SMHI
    expTemp = Math.round(expTemp)
    return expTemp;
}
