function loadLSIntoFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem("favorites"))
    for (const favorite in favorites) {
        favoritesList.push(favorites[favorite])
    }
}

function addOrRemoveFavorite() {
    const isFavorite = checkIfFavorite(chosenCity.name)
    if (isFavorite) {
        removeFavorite(chosenCity.name)
    } else {
        addFavorite(chosenCity.name)
    }
}

function checkIfFavorite(cityName):boolean {
    let isFavorite = false;
    for (const favorite in favoritesList) {
        if (cityName === favoritesList[favorite].name) {
            isFavorite = true;
        }
    }
    return isFavorite;
}

async function addFavorite(cityName) {
    const favoriteCity = {
        name: "",
        lon: "",
        lat: ""
    }
    const data = await getSwedishCities()

    for (const city in data) {
        if (cityName === data[city].city) {
            favoriteCity.name = data[city].city
            favoriteCity.lon = data[city].lng
            favoriteCity.lat = data[city].lat
        }
    }
    favoritesList.push(favoriteCity)
    localStorage.setItem("favorites", JSON.stringify(favoritesList))
}

function removeFavorite(cityName) {
    for (let i = 0; i < favoritesList.length; i++) {
        if (cityName === favoritesList[i].name) {
            favoritesList.splice(i, 1)
        }
    }
    localStorage.setItem("favorites", JSON.stringify(favoritesList))
}