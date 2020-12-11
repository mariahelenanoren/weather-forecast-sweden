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
        console.log("yes")
    } else {
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
    const favSymbol = document.querySelector("#favorite")
    favoritesList.push(chosenCity)
    localStorage.setItem("favorites", JSON.stringify(favoritesList))

    if (favSymbol) {
        favSymbol.innerHTML = "favorite"
    }
}

function removeFavorite(cityName) {
    const favSymbol = document.querySelector("#favorite")
    for (let i = 0; i < favoritesList.length; i++) {
        if (cityName === favoritesList[i].name) {
            favoritesList.splice(i, 1)
            localStorage.setItem("favorites", JSON.stringify(favoritesList))
        }
    }

    if (favSymbol) {
        favSymbol.innerHTML = "favorite_border"
    }
}