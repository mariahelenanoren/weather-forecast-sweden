function setBackgroundImage() {
    const backgroundImage = document.querySelector(".background-img")
    const background = document.querySelector("body")
    const season = getSeason();
    if (season === "winter") {
        backgroundImage.setAttribute("src", "./assets/winter.jpg")
        background.style.backgroundColor = "#2C3647"
    }
    if (season === "spring") {
        backgroundImage.setAttribute("src", "./assets/spring.jpg")
        background.style.backgroundColor = "#472c43"
    }
    if (season === "summer") {
        backgroundImage.setAttribute("src", "./assets/summer.jpg")
        background.style.backgroundColor = "#2c472e"
    }
    if (season === "fall") {
        backgroundImage.setAttribute("src", "./assets/fall.jpg")
        background.style.backgroundColor = "#47382c"
    }
}

function getSeason() {
    let season: string;
    if (month <= 2 || month >= 10) {
        season = "winter"
    } else if (month >= 3) {
        season = "spring"
    } else if (month >= 5 && month <= 5) {
        season = "summer"
    } else if (month >= 6 && month <= 9) {
        season = "fall"
    }
    return season;
}