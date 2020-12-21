/** Gets the sunrise API */
async function getSun(lon: string, lat: string) {
    try {
        const result = await fetch("https://api.sunrise-sunset.org/json?lat=" + lat +"&lng=" + lon + "&date=today")
        const data = await result.json()
        return data.results;
    } catch(error) {
    }
}

/** Presents sunrise and sunset data */
async function presentSun() {
    const data = await getSun(chosenCity.longitude, chosenCity.latitude);
    const sunrise = data.sunrise;
    const sunset = data.sunset;
    const formattedSunset = formatSun(sunset)
    const formattedSunrise = formatSun(sunrise)

    const sunsetTarget = document.querySelector("#sunset")
    const sunriseTarget = document.querySelector("#sunrise")
    sunsetTarget.innerHTML = formattedSunset
    sunriseTarget.innerHTML = formattedSunrise
}

/** Formats sunrise and sunset time */
function formatSun(data: string): string {
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

/** Checks if it is currently daylight savings */
function checkDaylightSavings(): boolean {
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

/** Adds value of 12 to hour */
function addTwelveHours(hour: number): number {
    const formattedHour = hour + 12
    return formattedHour;
}