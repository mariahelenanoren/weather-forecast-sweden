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

function formatSun(data: string) {
    let time: string | string[]
    time = data.split(" ")
    const timePeriod = time[1];
    let formattedData;

    const daylightSavings = checkDaylightSavings()
    if (timePeriod === "PM") {
        time = time[0].split(":")
        let hour = Number(time[0])
        const minutes = Number(time[1])
        if (daylightSavings === true) {
            formattedData = (hour + 12) + ":" + minutes
        }
        else if (daylightSavings === false) {
            hour += 1
            formattedData = (hour + 12) + ":" + minutes
        }
    }
    else if (timePeriod === "AM") {
        time = time[0].split(":")
        let hour = Number(time[0])
        const minutes = Number(time[1])
        if (daylightSavings === true) {
            formattedData = hour + ":" + minutes
        }
        else if (daylightSavings === false) {
            hour += 1
            formattedData = hour + ":" + minutes
        }
    }
    return formattedData;
}

function checkDaylightSavings(){
    const dateToday = new Date();
    const year = dateToday.getFullYear()
    const daylightSavingsDate  = new Date(year, 5); // Date which has DST, for comparison
    let daylightSavings: boolean;
    if (dateToday.getTimezoneOffset() === daylightSavingsDate.getTimezoneOffset()) {
        daylightSavings = true;
    }
    else {
        daylightSavings = false;
    }
    console.log(daylightSavings)
    return daylightSavings;
}