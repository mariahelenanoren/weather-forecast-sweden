const favoritesList = [];

function loadLSIntoFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem("favorites"))
    for (const favorite in favorites) {
        favoritesList.push(favorites[favorite])
    }
    console.log(favoritesList)
}

function addOrRemoveFavorite() {
    const isFavorite = checkIfFavorite(chosenCity.name)
    if (isFavorite) {
        removeFavorite(chosenCity.name)
        console.log("remove")
    } else {
        addFavorite(chosenCity.name)
        console.log("add")
    }
}

function checkIfFavorite(cityName):boolean {
    let isFavorite = false;
    for (const favorite in favoritesList) {
        if (cityName === favoritesList[favorite]) {
            isFavorite = true;
        }
    }
    return isFavorite;
}

function addFavorite(cityName) {
    favoritesList.push(cityName)
    localStorage.setItem("favorites", JSON.stringify(favoritesList))
}

function removeFavorite(cityName) {
    for (let i = 0; i < favoritesList.length; i++) {
        if (cityName === favoritesList[i]) {
            favoritesList.splice(i, 1)
        }
    }
    localStorage.setItem("favorites", JSON.stringify(favoritesList))
}

function displayFavorites() {
    const container = document.querySelector(".favorites-container")

    for (const favorite in favoritesList) {
        const div = document.createElement("div")
        div.setAttribute("class", "favorite grid")

        const pTemp = document.createElement("p")
        pTemp.setAttribute("class", "favorite-temp normal")
        pTemp.innerHTML = "18&deg;C"

        const favSymbol = document.createElement("span")
        favSymbol.setAttribute("class", "material-icons")
        favSymbol.innerHTML = "favorite"

        const borderDiv = document.createElement("div")
        borderDiv.setAttribute("class", "border")

        const cityDiv = document.createElement("div")
        cityDiv.setAttribute("class", "favorite-city flex center")

        const pCity = document.createElement("p")
        pCity.setAttribute("class", "city")
        pCity.innerHTML = favoritesList[favorite]

        const weatherSymbol = document.createElement("span")
        weatherSymbol.setAttribute("class", "material-icons")
        weatherSymbol.innerHTML = "brightness_7" // Change this to fit weather

        const moreButton = document.createElement("a")
        moreButton.setAttribute("class", "more-button normal")
        moreButton.innerHTML = "Mer info"
        
    }
}