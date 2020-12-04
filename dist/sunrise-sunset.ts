const dateToday = new Date();

async function getSun() {
    const lon = chosenCity.lon
    const lat = chosenCity.lat
    try {
        const result = await fetch("https://api.sunrise-sunset.org/json?lat=" + lat +"&lng=" + lon + "&date=today")
        const data = await result.json()
        return data.results;
    } catch(error) {
    }
}

async function presentSun() {
    const data = await getSun();
    const sunrise = data.sunrise;
    const sunset = data.sunset;
    const formattedSunset = formatSun(sunset)
    const formattedSunrise = formatSun(sunrise)

    const sunsetTarget = document.querySelector("#sunset")
    const sunriseTarget = document.querySelector("#sunrise")
    sunsetTarget.innerHTML = formattedSunset
    sunriseTarget.innerHTML = formattedSunrise
    console.log(sunrise)
    console.log(sunset)
}

/* NEEDS TO ACCOUNT FOR SUMMERTIME */
function formatSun(sun: string) {
    let formattedSun: string | string[]
    formattedSun = sun.split(" ")
    if (formattedSun[1] === "PM") {
        formattedSun = formattedSun[0].split(":")
        formattedSun = (Number(formattedSun[0]) + 13) + ":" + formattedSun[1] // +12 makes it summertime, +13 makes it wintertime
    }
    else {
        formattedSun = formattedSun[0].split(":")
        formattedSun = formattedSun[0] + ":" + formattedSun[1]
    }
    return formattedSun;
}