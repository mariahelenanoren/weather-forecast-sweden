/** Sets the background image and color */
function setBackground() {
    var backgroundImage = document.querySelector(".background-img");
    var background = document.querySelector("body");
    var season = getSeason();
    if (season === "winter") {
        backgroundImage.setAttribute("src", "./assets/winter.jpg");
        background.style.backgroundColor = "#2C3647";
    }
    if (season === "spring") {
        backgroundImage.setAttribute("src", "./assets/spring.jpg");
        background.style.backgroundColor = "#2c472e";
    }
    if (season === "summer") {
        backgroundImage.setAttribute("src", "./assets/summer.jpg");
        background.style.backgroundColor = "#472c47";
    }
    if (season === "fall") {
        backgroundImage.setAttribute("src", "./assets/fall.jpg");
        background.style.backgroundColor = "#47392c";
    }
}
/** Gets the current season */
function getSeason() {
    var season;
    if (month <= 2 || month >= 10) {
        season = "winter";
    }
    else if (month >= 3) {
        season = "spring";
    }
    else if (month >= 5 && month <= 5) {
        season = "summer";
    }
    else if (month >= 6 && month <= 9) {
        season = "fall";
    }
    return season;
}
