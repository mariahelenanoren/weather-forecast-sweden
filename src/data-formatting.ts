function formatDataWithDeg(data) {
    const formattedData = Math.round(data) + "&deg;"
    return formattedData;
}

function formatDataWithCel(data) {
    const formattedData = Math.round(data) + "&deg;C"
    return formattedData;
}

function formatHour(data) {
    const date = data
    let time = date.split("T")
    time = time[1]
    const timeSets = time.split(":")
    const hour = timeSets[0] + ":00"
    return hour;
}

function formatSingleDigitValues(data) {
    let formattedData = String(data)
    if (formattedData.length < 2) {
        formattedData = "0" + formattedData
    }
    return formattedData;
}