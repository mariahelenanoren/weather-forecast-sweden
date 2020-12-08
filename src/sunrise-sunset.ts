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
        /* Accounts for unreliability of API time format */
        if (hour < 10) {
            hour = addTwelveHours(hour)
        }
        const minutes = Number(time[1])
        if (daylightSavings === true) {
            formattedData = hour + ":" + formatSingleDigitValues(minutes)
        }
        else if (daylightSavings === false) {
            hour += 1
            formattedData = hour + ":" + formatSingleDigitValues(minutes)
        }
    }
    else if (timePeriod === "AM") {
        time = time[0].split(":")
        let hour = Number(time[0])
        const minutes = Number(time[1])
        if (daylightSavings === true) {
            formattedData = formatSingleDigitValues(hour) + ":" + formatSingleDigitValues(minutes)
        }
        else if (daylightSavings === false) {
            hour += 1
            formattedData = formatSingleDigitValues(hour) + ":" + formatSingleDigitValues(minutes)
        }
    }
    return formattedData;
}

function checkDaylightSavings(){
    const daylightSavingsDate  = new Date(year, 5); // Date which has DST, for comparison
    let daylightSavings: boolean;

    if (dateToday.getTimezoneOffset() === daylightSavingsDate.getTimezoneOffset()) {
        daylightSavings = true;
    }
    else {
        daylightSavings = false;
    }
    return daylightSavings;
}

function addTwelveHours(hour) {
    const formattedHour = hour + 12
    return formattedHour;
}