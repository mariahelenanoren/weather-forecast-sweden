function loadLSIntoFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem("favorites"))
    for (const favorite in favorites) {
        favoritesList.push(favorites[favorite])
    }
}

function addOrRemoveFavorite(locality, municipality) {
    const isFavorite = checkIfFavorite(locality, municipality)
    if (isFavorite) {
        removeFavorite(locality, municipality)
    } else {
        addFavorite()
    }
}

function checkIfFavorite(locality, municipality):boolean {
    let isFavorite = false;
    for (const favorite in favoritesList) {
        if (locality === favoritesList[favorite].locality && municipality === favoritesList[favorite].municipality) {
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

function removeFavorite(locality, municipality) {
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