async function getForecast(lon, lat) {
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function presentForecastData() {
    const data = await getForecast(chosenCity.longitude, chosenCity.latitude);
    
    presentCityName()
    changeFavoriteSymbol()
    presentForecastForToday(data)
    present30HForecast(data)
    present9DayForecast(data)
}

function presentCityName() {
    const cityTarget = document.querySelector("#name")
    const municipalityTarget = document.querySelector("#municipality")
    cityTarget.innerHTML = chosenCity.locality
    municipalityTarget.innerHTML = chosenCity.municipality
}

function changeFavoriteSymbol() {
    if (checkIfFavorite(chosenCity.locality, chosenCity.municipality)) {
        document.querySelector("#favorite").innerHTML = "favorite"
    }
}