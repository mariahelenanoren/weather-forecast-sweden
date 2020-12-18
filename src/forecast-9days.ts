function present9DayForecast(data) {
    const dayData = data.timeSeries
    const container = document.querySelector(".weekly-forecast")
    for (let d = 0; d < 10; d++) {
        let validYear: number | string = Number(year)
        let validMonth: number | string = Number(month) + 1 // +1 because month variable is zero-based
        let validDate: number | string = Number(date) + 1 + d // +1 because forecast should start from day after today
        if (checkEndOfMonth(validMonth, validDate) === true) {
            validMonth += 1;
            validDate = 1;
        }
        const validTime = validYear + "-" + formatSingleDigitValues(validMonth) + "-" + formatSingleDigitValues(validDate) + "T12:00:00Z"
        for (let i = 0; i < dayData.length; i++) {
            if (dayData[i].validTime === validTime) {
                const innerContainer = document.createElement("div")
                innerContainer.setAttribute("class", "day-container flex row align-center justify-space-between")

                const pDate = document.createElement("p")
                pDate.innerHTML = getNameOfWeekday(validYear, validMonth, validDate) + " " + validDate + " " + getNameOfMonth(validMonth)

                const div = document.createElement("div")
                div.setAttribute("class", "flex row center")

                const pTemp = document.createElement("p")                
                /* Accounts for irregularities in parameter index */
                for (const parameter in dayData[i].parameters) {
                    if (dayData[i].parameters[parameter].name === "t") {
                        pTemp.innerHTML = formatDataWithCel(dayData[i].parameters[parameter].values[0])
                    }
                }

                const span = document.createElement("span")
                span.setAttribute("class", "material-icons")
                span.innerHTML = "brightness_2" // Change this to fit weather

                div.append(pTemp, span)
                innerContainer.append(pDate, div)
                container.append(innerContainer)
            }
        }
    }
}

function checkEndOfMonth(month, day) {
    const daysInMonth = getDaysInMonth(year, month)
    let nextMonth = false;
    if (day > daysInMonth) {
        nextMonth = true;
    }
    return nextMonth;
}

function getDaysInMonth(month,year) {
   return new Date(year, month, 0).getDate();
}

function getNameOfMonth(month) {
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

function getNameOfWeekday(year, month, date) {
    const day = new Date(year, month - 1, date - 1).getDay();
    switch(day) {
        case 0: return "Måndag"
        case 1: return "Tisdag"
        case 2: return "Onsdag"
        case 3: return "Torsdag"
        case 4: return "Fredag"
        case 5: return "Lördag"
        case 6: return "Söndag"
    }
}