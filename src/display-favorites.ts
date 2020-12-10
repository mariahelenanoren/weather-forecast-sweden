async function getForecastForFavorites(lon, lat) {
    try {
        const result = await fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function displayFavorites() {
    const container = document.querySelector(".favorites-container")

    for (const favorite in favoritesList) {
        const favoriteData = await getForecastForFavorites(favoritesList[favorite].lon, favoritesList[favorite].lat)
        const favoriteDataNow = favoriteData.timeSeries[0]

        const innerContainerDiv = document.createElement("div")
        innerContainerDiv.setAttribute("class", "favorite grid")

        const pTemp = document.createElement("p")
        pTemp.setAttribute("class", "favorite-temp normal")
        /* Accounts for irregularities in parameter index */
        for (const parameter in favoriteDataNow.parameters) {
            if(favoriteDataNow.parameters[parameter].name === "t") {
                pTemp.innerHTML = formatDataWithCel(favoriteDataNow.parameters[parameter].values[0])
            }
        }

        const favSymbol = document.createElement("span")
        favSymbol.setAttribute("class", "material-icons favorite-symbol")
        favSymbol.innerHTML = "favorite"

        const borderDiv = document.createElement("div")
        borderDiv.setAttribute("class", "border")

        const cityDiv = document.createElement("div")
        cityDiv.setAttribute("class", "favorite-city flex center")

        const pCity = document.createElement("p")
        pCity.setAttribute("class", "city")
        pCity.innerHTML = favoritesList[favorite].name

        const weatherSymbol = document.createElement("span")
        weatherSymbol.setAttribute("class", "material-icons")
        weatherSymbol.innerHTML = "brightness_7" // Change this to fit weather

        const moreButton = document.createElement("a")
        moreButton.setAttribute("class", "more-button normal")
        moreButton.innerHTML = "Mer info"

        cityDiv.append(pCity, weatherSymbol)
        innerContainerDiv.append(pTemp, favSymbol, borderDiv, cityDiv, moreButton)
        container.append(innerContainerDiv)
    }
}