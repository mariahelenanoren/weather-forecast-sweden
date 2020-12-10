function loadLSIntoFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem("favorites"))
    for (const favorite in favorites) {
        favoritesList.push(favorites[favorite])
    }
}

function addOrRemoveFavorite(cityName) {
    const isFavorite = checkIfFavorite(cityName)
    if (isFavorite) {
        removeFavorite(cityName)
        console.log("remove")
    } else {
        console.log("add")
        addFavorite()
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

async function addFavorite() {
    console.log(chosenCity)
    favoritesList.push(chosenCity)
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