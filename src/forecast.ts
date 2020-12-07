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
    present36HForecast(data)
}

function presentForecastForToday(data) {
    const todaysData = data.timeSeries[0]

    presentCityName()
    presentTemp(todaysData)
    presentVisibility(todaysData)
    presentHumidity(todaysData)
    presentExpTemp(todaysData)
    presentWind(todaysData)
    presentAirPressure(todaysData)
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

function formatDataWithCel(data) {
    const formattedData = Math.round(data) + "&deg;C"
    return formattedData;
}

function presentVisibility(data) {
    const visibilityTarget = document.querySelector("#visibility")
    const visibilityData = data.parameters[2].values[0]
    const visibility = Math.round(visibilityData)
    visibilityTarget.innerHTML = visibility + " km"
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

function presentWind(data) {
    const windTarget = document.querySelector("#wind")
    const windData = data.parameters[4].values[0]
    const wind = Math.round(windData)
    windTarget.innerHTML = wind + " m/s"
}

function presentAirPressure(data) {
    const airPressureTarget = document.querySelector("#air-pressure")
    const airPressureData = data.parameters[0].values[0]
    const airPressure = Math.round(airPressureData)
    airPressureTarget.innerHTML = airPressure + " hPa"
}

function present36HForecast(data) {
    const container = document.querySelector(".hourly-forecast-inner")
    const hourData = data.timeSeries

    for (let i = 0; i < 36; i++) {
        console.log(hourData[i])
        const div = document.createElement("div")
        div.setAttribute("class", "hour-container flex column center")
        
        const pTime = document.createElement("p")
        if (i === 0) {
            pTime.setAttribute("class", "semi-bold")
            pTime.innerHTML = "Nu"
        } else {
            pTime.setAttribute("class", "normal")
            pTime.innerHTML = formatHour(hourData[i].validTime) // Change this to fit time
        }

        const span = document.createElement("span")
        span.setAttribute("class", "material-icons")
        span.innerHTML = "brightness_2" // Change this to fit weather

        const pTemp = document.createElement("p")
        pTemp.setAttribute("class", "hour-temp normal")
        console.log(hourData[i].parameters[1].values[0])
        pTemp.innerHTML = formatDataWithCel(hourData[i].parameters[1].values[0]) // Change to fit temp

        div.append(pTime, span, pTemp)
        container.append(div)
    }
}

function formatHour(data) {
    const date = data
    let time = date.split("T")
    time = time[1]
    const timeSets = time.split(":")
    const hour = timeSets[0] + ":00"
    return hour;
}
