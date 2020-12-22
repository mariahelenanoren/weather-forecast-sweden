/** Loads favorites from local storage */
function loadLSIntoFavoritesList() {
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    for (var favorite in favorites) {
        favoritesList.push(favorites[favorite]);
    }
}
/** Adds or removes favorite */
function addOrRemoveFavorite(locality, municipality) {
    var isFavorite = checkIfFavorite(locality, municipality);
    if (isFavorite) {
        removeFavorite(locality, municipality);
    }
    else {
        addFavorite();
    }
}
/** Checks if city is favorite */
function checkIfFavorite(locality, municipality) {
    var isFavorite = false;
    for (var favorite in favoritesList) {
        if (locality === favoritesList[favorite].locality && municipality === favoritesList[favorite].municipality) {
            isFavorite = true;
        }
    }
    return isFavorite;
}
/** Adds city as favorite */
function addFavorite() {
    var favSymbol = document.querySelector("#favorite");
    favoritesList.push(chosenCity);
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
    if (favSymbol) {
        favSymbol.innerHTML = "favorite";
    }
}
/** Removes city as favorite */
function removeFavorite(locality, municipality) {
    var favSymbol = document.querySelector("#favorite");
    for (var i = 0; i < favoritesList.length; i++) {
        if (locality === favoritesList[i].locality && municipality === favoritesList[i].municipality) {
            favoritesList.splice(i, 1);
            localStorage.setItem("favorites", JSON.stringify(favoritesList));
        }
    }
    if (favSymbol) {
        favSymbol.innerHTML = "favorite_border";
    }
}
