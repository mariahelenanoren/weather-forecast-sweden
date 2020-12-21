function presentForecastForToday(data) {
    let todaysData;
    /* Accounts for late data updates */
    if (formatHour(data.timeSeries[0].validTime) === hour + ":00") {
        todaysData = data.timeSeries[0]
    } else {
        todaysData = data.timeSeries[1]
    }
    let temp;
    let wind;

    const parameters = todaysData.parameters

    /* Accounts for irregularities in parameter index */
    for (const parameter in parameters) {
        switch(parameters[parameter].name) {
            case "t":
                presentTemp(parameters[parameter])
                temp = parameters[parameter].values[0]
                ;break
            case "vis":
                presentVisibility(parameters[parameter])
                ;break
            case "r":
                presentHumidity(parameters[parameter])
                ;break
            case "ws":
                presentWind(parameters[parameter])
                wind = parameters[parameter].values[0]
                ;break
            case "msl":
                presentAirPressure(parameters[parameter])
                ;break
            case "Wsymb2":
                presentWeatherCondition(parameters[parameter])
                createWeatherIcon(parameters[parameter]);
            ;break
            default:
                break;
        }
    }
    presentExpTemp(temp, wind)
}

function presentTemp(data) {
    const tempTarget = document.querySelector("#temp")
    const tempData = data.values[0]
    tempTarget.innerHTML = formatDataWithDeg(tempData);
}

function presentVisibility(data) {
    const visibilityTarget = document.querySelector("#visibility")
    const visibilityData = data.values[0]
    const visibility = Math.round(visibilityData)
    visibilityTarget.innerHTML = visibility + " km"
}

function presentHumidity(data) {
    const humidityTarget = document.querySelector("#humidity")
    const humidityData = data.values[0]
    humidityTarget.innerHTML = humidityData + "&#37;" 
}

function presentExpTemp(temp, wind) {
    const expTempTarget = document.querySelector("#exp-temp")
    const expTemp = calculateExpTemp(temp, wind)
    expTempTarget.innerHTML = expTemp + "&deg;C"
}

function calculateExpTemp(tempData, windData) {
    let expTemp;
    if (tempData <= 10 && tempData >= -40 && windData >= 2 && windData <= 35) {
        expTemp = 13.12 + (0.6215 * tempData) - (13.956 * Math.pow(windData, 0.16)) + (0.48669 * tempData * Math.pow(windData, 0.16)) // Wind chill formula from SMHI
        expTemp = Math.round(expTemp) 
    } else {
        expTemp = Math.round(tempData);
    }
    return expTemp;
}

function presentWind(data) {
    const windTarget = document.querySelector("#wind")
    const windData = data.values[0]
    const wind = Math.round(windData)
    windTarget.innerHTML = wind + " m/s"
}

function presentAirPressure(data) {
    const airPressureTarget = document.querySelector("#air-pressure")
    const airPressureData = data.values[0]
    const airPressure = Math.round(airPressureData)
    airPressureTarget.innerHTML = airPressure + " hPa"
}

function presentWeatherCondition(data) {
    const weatherTarget = document.querySelector("#weather-condition")
    const weatherCondition = getWeatherCondition(data.values[0])
    weatherTarget.innerHTML = "Just nu: " + weatherCondition   
}

function createWeatherIcon(data) {
    const cityName = document.querySelector("#name")
    const weatherIcon = getWeatherIcon(data.values[0])
    const icon = document.createElement("i")
    icon.setAttribute("class", "wi " + weatherIcon)
    cityName.append(icon)
}

function getWeatherCondition(value: number): string {
    switch (value) {
        case 1: return "klar himmel"
        case 2: return "nästan klar himmel"
        case 3: return "varierande molnighet"
        case 4: return "halvklar himmel"
        case 5: return "monligt"
        case 6: return "mulet"
        case 7: return "dimma"
        case 8: return "lätt regnskur"
        case 9: return "måttlig regnskur"
        case 10: return "kraftig regnskur"
        case 11: return "åskväder"
        case 12: return "lätt skur av snörblandat regn"
        case 13: return "måttlig skur av snörblandat regn"
        case 14: return "kraftig skur av snörblandat regn"
        case 15: return "lätt snöby"
        case 16: return "måttlig snöby"
        case 17: return "kraftig snöby"
        case 18: return "lätt regn"
        case 19: return "måttligt regn"
        case 20: return "kraftigt regn"
        case 21: return "åska"
        case 22: return "lätt snöblandat regn"
        case 23: return "måttligt snöblandat regn"
        case 24: return "kraftigt snöblandat regn"
        case 25: return "lätt snöfall"
        case 26: return "måttligt snöfall"
        case 27: return "kraftigt snöfall"
    }
}