/** Creates and presents 9 day forecast */
function present9DayForecast(data: object | any) {
    const dayData = data.timeSeries
    console.log(dayData)
    const container = document.querySelector(".weekly-forecast")
    for (let d = 0; d < 9; d++) {
        let validYear: number | string = Number(year)
        let validMonth: number | string = Number(month)
        let validDate: number | string = Number(date) + 1 + d // +1 because forecast should start from day after today
        if (checkEndOfMonth(validMonth, validDate) === true) {
            validMonth += 1;
            if (checkEndOfYear(validMonth) === true) {
                validYear += 1;
                validDate -= getDaysInMonth(year, validMonth)
                if (validMonth === 13) {
                    validMonth = 1;
                }
            }
        }
        console.log(validYear)
        const validTime = validYear + "-" + formatSingleDigitValues(validMonth) + "-" + formatSingleDigitValues(validDate) + "T12:00:00Z"
        console.log(validTime)
        for (let i = 0; i < dayData.length; i++) {
            if (dayData[i].validTime === validTime) {
                const innerContainer = document.createElement("div")
                innerContainer.setAttribute("class", "day-container flex row align-center justify-space-between")

                const pDate = document.createElement("p")
                pDate.innerHTML = getNameOfWeekday(validYear, validMonth, validDate) + " " + validDate + " " + getNameOfMonth(validMonth)

                const div = document.createElement("div")
                div.setAttribute("class", "flex row center")

                const pTemp = document.createElement("p")                

                const weatherIcon = document.createElement("i")
                weatherIcon.setAttribute("class", "wi")
                /* Accounts for irregularities in parameter index */
                for (const parameter in dayData[i].parameters) {
                    if (dayData[i].parameters[parameter].name === "t") {
                        pTemp.innerHTML = formatDataWithCel(dayData[i].parameters[parameter].values[0])
                    }
                    else if (dayData[i].parameters[parameter].name === "Wsymb2") {
                        const icon = getWeatherIcon(dayData[i].parameters[parameter].values[0])
                        weatherIcon.classList.add(icon)
                    }
                }
                div.append(pTemp, weatherIcon)
                innerContainer.append(pDate, div)
                container.append(innerContainer)
            }
        }
    }
}

function checkEndOfYear(month: number) {
    let nextYear = false;
    if (month >= 12) {
        nextYear = true;
    }
    return nextYear;
}

/** Checks if it is the end of the month */
function checkEndOfMonth(month: number, day: number): boolean {
    const daysInMonth = getDaysInMonth(year, month)
    let nextMonth = false;
    if (day > daysInMonth) {
        nextMonth = true;
    }
    return nextMonth;
}

/** Gets the number of days in a month */
function getDaysInMonth(year: number, month: number): number {
   return new Date(year, month, 0).getDate();
}

/** Gets the name of the weekday */
function getNameOfWeekday(year: number, month: number, date: number): string {
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