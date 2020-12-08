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