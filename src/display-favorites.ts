/** Displays favorites */
async function displayFavorites() {
    const container = document.querySelector(".favorites-container")

    for (const favorite in favoritesList) {
        let favoriteData = await getForecast(favoritesList[favorite].longitude, favoritesList[favorite].latitude)
        favoriteData = favoriteData.timeSeries[0]

        const innerContainerDiv = document.createElement("div")
        innerContainerDiv.setAttribute("class", "favorite grid")

        const pTemp = document.createElement("p")
        pTemp.setAttribute("class", "favorite-temp normal")

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

        const weatherIcon = document.createElement("i")
        weatherIcon.setAttribute("class", "wi")

        const moreButton = document.createElement("a")
        moreButton.setAttribute("class", "more-button normal")
        moreButton.innerHTML = "Mer info"

        /* Accounts for irregularities in parameter index */
        for (const parameter in favoriteData.parameters) {
            if (favoriteData.parameters[parameter].name === "t") {
                pTemp.innerHTML = formatDataWithCel(favoriteData.parameters[parameter].values[0])
            }
            if (favoriteData.parameters[parameter].name === "Wsymb2") {
                const icon = getWeatherIcon(favoriteData.parameters[parameter].values[0])
                weatherIcon.classList.add(icon)
            }
        }

        pCity.append(weatherIcon)
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

/** Presents forecast for favorite */
async function presentFavoriteForecast(index: string) {
    if (index) {
        chosenCity.locality = favoritesList[index].locality
        chosenCity.municipality = favoritesList[index].municipality
        chosenCity.longitude = favoritesList[index].longitude
        chosenCity.latitude = favoritesList[index].latitude
        setChosenCityLS()
        goToForecast()
    }
}