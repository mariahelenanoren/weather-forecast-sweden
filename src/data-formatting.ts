/** Formats data which is presented with celcius symbol */
function formatDataWithDeg(data) {
    const formattedData = Math.round(data) + "&deg;"
    return formattedData;
}

/** Formats data which is presented with celcius symbol and C */
function formatDataWithCel(data: number) {
    const formattedData = Math.round(data) + "&deg;C"
    return formattedData;
}

/** Formats hours derived from SMHI data */
function formatSMHIHour(data: string) {
    const date: string = data
    let time: string | string[] = date.split("T")
    time = time[1]
    const timeSets = time.split(":")
    const hour = timeSets[0] + ":00"
    return hour;
}

/** Adds a 0 before single digit values */
function formatSingleDigitValues(data: number) {
    let formattedData = String(data)
    if (formattedData.length < 2) {
        formattedData = "0" + formattedData
    }
    return formattedData;
}

/** Gets name for weather icon */
function getWeatherIcon(value: number): string {
    switch (value) {
        case 1: return "wi-day-sunny"
        case 2: return "wi-day-cloudy"
        case 3: return "wi-cloudy"
        case 4: return "wi-cloudy"
        case 5: return "wi-cloudy"
        case 6: return "wi-cloudy"
        case 7: return "wi-fog"
        case 8: return "wi-showers"
        case 9: return "wi-rain"
        case 10: return "wi-rain"
        case 11: return "wi-lightning"
        case 12: return "wi-sleet"
        case 13: return "wi-sleet"
        case 14: return "wi-sleet"
        case 15: return "wi-snow"
        case 16: return "wi-snow"
        case 17: return "wi-snow"
        case 18: return "wi-showers"
        case 19: return "wi-rain"
        case 20: return "wi-rain"
        case 21: return "wi-lightning"
        case 22: return "wi-sleet"
        case 23: return "wi-sleet"
        case 24: return "wi-sleet"
        case 25: return "wi-snow"
        case 26: return "wi-snow"
        case 27: return "wi-snow"
    }
}

/** Gets the name of the month */
function getNameOfMonth(month: number): string {
    switch(month) {
        case 1: return "januari"
        case 2: return "februari"
        case 3: return "mars"
        case 4: return "april"
        case 5: return "maj"
        case 6: return "juni"
        case 7: return "juli"
        case 8: return "augusti"
        case 9: return "september"
        case 10: return "oktober"
        case 11: return "november"
        case 12: return "december"
    }
}