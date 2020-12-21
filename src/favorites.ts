/** Loads favorites from local storage */
function loadLSIntoFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem("favorites"))
    for (const favorite in favorites) {
        favoritesList.push(favorites[favorite])
    }
}

/** Adds or removes favorite */
function addOrRemoveFavorite(locality: string, municipality: string) {
    const isFavorite = checkIfFavorite(locality, municipality)
    if (isFavorite) {
        removeFavorite(locality, municipality)
    } else {
        addFavorite()
    }
}

/** Checks if city is favorite */
function checkIfFavorite(locality: string, municipality: string):boolean {
    let isFavorite = false;
    for (const favorite in favoritesList) {
        if (locality === favoritesList[favorite].locality && municipality === favoritesList[favorite].municipality) {
            isFavorite = true;
        }
    }
    return isFavorite;
}

/** Adds city as favorite */
function addFavorite() {
    const favSymbol = document.querySelector("#favorite")
    favoritesList.push(chosenCity)
    localStorage.setItem("favorites", JSON.stringify(favoritesList))

    if (favSymbol) {
        favSymbol.innerHTML = "favorite"
    }
}

/** Removes city as favorite */
function removeFavorite(locality: string, municipality: string) {
    const favSymbol = document.querySelector("#favorite")
    for (let i = 0; i < favoritesList.length; i++) {
        if (locality === favoritesList[i].locality && municipality === favoritesList[i].municipality) {
            favoritesList.splice(i, 1)
            localStorage.setItem("favorites", JSON.stringify(favoritesList))
        }
    }

    if (favSymbol) {
        favSymbol.innerHTML = "favorite_border"
    }
}