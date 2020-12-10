function displayFavorites() {
    const container = document.querySelector(".favorites-container")

    for (const favorite in favoritesList) {
        const innerContainerDiv = document.createElement("div")
        innerContainerDiv.setAttribute("class", "favorite grid")

        const pTemp = document.createElement("p")
        pTemp.setAttribute("class", "favorite-temp normal")
        pTemp.innerHTML = "18&deg;C"

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