async function getForecast(lon, lat) {
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function getSvenskaStader() {
    try {
        const result = await fetch("svenska-stader-master/src/svenska-stader.csv")
        const data = await result.text()
        return data;
    } catch(error) {
    }
}

async function parseSvenskaStader() {
    const data = await getSvenskaStader();
    const dataArray = data.split("\n")
    const cityArray = []
    for (const city in dataArray) {
        const parameters = dataArray[city].split(",")
        const cityObject = {
            locality: parameters[0],
            municipality: parameters[1],
            county: parameters[2],
            latitude: parameters[3],
            longitude: parameters[4]
        }
        if (cityObject.locality !== "" && cityObject.locality !== "Locality") {
            cityArray.push(cityObject)
        }
    }
    console.log(cityArray)
}

async function presentForecastData() {
    const chosenCityLS = getChosenCity()
    const data = await getForecast(chosenCityLS.lon, chosenCityLS.lat);
    
    presentCityName()
    changeFavoriteSymbol()
    presentForecastForToday(data)
    present30HForecast(data)
    present9DayForecast(data)
}

function presentCityName() {
    const chosenCityLS = getChosenCity()
    const cityTarget = document.querySelector("#name")
    cityTarget.innerHTML = chosenCityLS.name;
}

function changeFavoriteSymbol() {
    const cityName = chosenCity.name
    if (checkIfFavorite(cityName)) {
        document.querySelector("#favorite").innerHTML = "favorite"
    }
}