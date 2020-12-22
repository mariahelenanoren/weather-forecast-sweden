/** Creates and presents 9 day forecast */
function present9DayForecast(data) {
    var dayData = data.timeSeries;
    var container = document.querySelector(".weekly-forecast");
    for (var d = 0; d < 10; d++) {
        var validYear = Number(year);
        var validMonth = Number(month);
        var validDate = Number(date) + 1 + d; // +1 because forecast should start from day after today
        if (checkEndOfMonth(validMonth, validDate) === true) {
            validMonth += 1;
            validDate = 1;
        }
        var validTime = validYear + "-" + formatSingleDigitValues(validMonth) + "-" + formatSingleDigitValues(validDate) + "T12:00:00Z";
        for (var i = 0; i < dayData.length; i++) {
            if (dayData[i].validTime === validTime) {
                var innerContainer = document.createElement("div");
                innerContainer.setAttribute("class", "day-container flex row align-center justify-space-between");
                var pDate = document.createElement("p");
                pDate.innerHTML = getNameOfWeekday(validYear, validMonth, validDate) + " " + validDate + " " + getNameOfMonth(validMonth);
                var div = document.createElement("div");
                div.setAttribute("class", "flex row center");
                var pTemp = document.createElement("p");
                var weatherIcon = document.createElement("i");
                weatherIcon.setAttribute("class", "wi");
                /* Accounts for irregularities in parameter index */
                for (var parameter in dayData[i].parameters) {
                    if (dayData[i].parameters[parameter].name === "t") {
                        pTemp.innerHTML = formatDataWithCel(dayData[i].parameters[parameter].values[0]);
                    }
                    else if (dayData[i].parameters[parameter].name === "Wsymb2") {
                        var icon = getWeatherIcon(dayData[i].parameters[parameter].values[0]);
                        weatherIcon.classList.add(icon);
                    }
                }
                div.append(pTemp, weatherIcon);
                innerContainer.append(pDate, div);
                container.append(innerContainer);
            }
        }
    }
}
/** Checks if it is the end of the month */
function checkEndOfMonth(month, day) {
    var daysInMonth = getDaysInMonth(year, month);
    var nextMonth = false;
    if (day > daysInMonth) {
        nextMonth = true;
    }
    return nextMonth;
}
/** Gets the number of days in a month */
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
/** Gets the name of the weekday */
function getNameOfWeekday(year, month, date) {
    var day = new Date(year, month - 1, date - 1).getDay();
    switch (day) {
        case 0: return "Måndag";
        case 1: return "Tisdag";
        case 2: return "Onsdag";
        case 3: return "Torsdag";
        case 4: return "Fredag";
        case 5: return "Lördag";
        case 6: return "Söndag";
    }
}
