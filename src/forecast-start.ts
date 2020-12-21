/** Gets SMHI forecast API */
async function getForecast(lon: string, lat: string) {
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

/** Presents forecast data */
async function presentForecastData() {
    const data = await getForecast(chosenCity.longitude, chosenCity.latitude);
    
    presentCityName()
    changeFavoriteSymbol()
    presentForecastForToday(data)
    present30HForecast(data)
    present9DayForecast(data)
}

/** Presents city and municipality name */
function presentCityName() {
    const cityTarget = document.querySelector("#name")
    const municipalityTarget = document.querySelector("#municipality")
    cityTarget.innerHTML = chosenCity.locality
    municipalityTarget.innerHTML = chosenCity.municipality
}

/** Changes favorite symbol */
function changeFavoriteSymbol() {
    if (checkIfFavorite(chosenCity.locality, chosenCity.municipality)) {
        document.querySelector("#favorite").innerHTML = "favorite"
    }
}