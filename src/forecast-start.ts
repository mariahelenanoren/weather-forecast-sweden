async function getForecast(lon, lat) {
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
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