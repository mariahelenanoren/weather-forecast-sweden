async function displayFavorites() {
    const container = document.querySelector(".favorites-container")

    for (const favorite in favoritesList) {
        let favoriteData = await getForecast(favoritesList[favorite].longitude, favoritesList[favorite].latitude)
        favoriteData = favoriteData.timeSeries[0]

        const innerContainerDiv = document.createElement("div")
        innerContainerDiv.setAttribute("class", "favorite grid")

        const pTemp = document.createElement("p")
        pTemp.setAttribute("class", "favorite-temp normal")
        /* Accounts for irregularities in parameter index */
        for (const parameter in favoriteData.parameters) {
            if(favoriteData.parameters[parameter].name === "t") {
                pTemp.innerHTML = formatDataWithCel(favoriteData.parameters[parameter].values[0])
            }
        }

        const favSymbol = document.createElement("span")
        favSymbol.setAttribute("class", "material-icons favorite-symbol")
        favSymbol.innerHTML = "favorite"
        favSymbol.addEventListener("click", function() {
            const favSymbols = document.getElementsByClassName("favorite-symbol")
            for (let i = 0; i < favSymbols.length; i++) {
                if (favSymbol === favSymbols[i]) {
                    addOrRemoveFavorite(favoritesList[i].locality, favoritesList[i].municipality)
                    favSymbol.parentElement.remove()
                }
            }
        })

        const borderDiv = document.createElement("div")
        borderDiv.setAttribute("class", "border")

        const pCity = document.createElement("p")
        pCity.setAttribute("class", "city")
        pCity.innerHTML = favoritesList[favorite].locality

        const pMunicipality = document.createElement("p")
        pMunicipality.setAttribute("class", "municipality")
        pMunicipality.innerHTML = favoritesList[favorite].municipality

        const weatherSymbol = document.createElement("span")
        weatherSymbol.setAttribute("class", "material-icons weather-symbol")
        weatherSymbol.innerHTML = "brightness_7" // Change this to fit weather

        const moreButton = document.createElement("a")
        moreButton.setAttribute("class", "more-button normal")
        moreButton.setAttribute("href", "../city-forecast.html")
        moreButton.innerHTML = "Mer info"

        pCity.append(weatherSymbol)
        innerContainerDiv.append(pTemp, favSymbol, borderDiv, pCity, pMunicipality, moreButton)
        container.append(innerContainerDiv)
    }

    const moreButton: NodeListOf<HTMLLinkElement> = document.querySelectorAll(".more-button")

    for (let i = 0; i < moreButton.length; i++) {
        moreButton[i].setAttribute("index", String(i))
        moreButton[i].onclick = function() {
            presentFavoriteForecast(moreButton[i].getAttribute("index"))
        }
    }
}

async function presentFavoriteForecast(index) {
    if (index) {
        chosenCity.locality = favoritesList[index].locality
        chosenCity.municipality = favoritesList[index].municipality
        chosenCity.longitude = favoritesList[index].longitude
        chosenCity.latitude = favoritesList[index].latitude
        setChosenCity()
    }
}