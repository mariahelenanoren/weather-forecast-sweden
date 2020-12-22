/** Creates and presents 30h forecast */
function present30HForecast(data) {
    var container = document.querySelector(".hourly-forecast-inner");
    var hourData = data.timeSeries;
    var skipFirstHour;
    skipFirstHour = false;
    for (var i = 0; i < 31; i++) {
        /* Accounts for late data updates */
        if (formatSingleDigitValues(hour - 1) + ":00" === formatSMHIHour(hourData[i].validTime)) {
            skipFirstHour = true;
        }
        else {
            var div = document.createElement("div");
            div.setAttribute("class", "hour-container flex column center");
            var pTime = document.createElement("p");
            if (i === 0 && skipFirstHour === false || i === 1 && skipFirstHour === true) {
                pTime.setAttribute("class", "semi-bold");
                pTime.innerHTML = "Nu";
            }
            else {
                pTime.setAttribute("class", "normal");
                pTime.innerHTML = formatSMHIHour(hourData[i].validTime);
            }
            var weatherIcon = document.createElement("i");
            weatherIcon.setAttribute("class", "wi");
            var pTemp = document.createElement("p");
            pTemp.setAttribute("class", "hour-temp normal");
            /* Accounts for irregularities in parameter index */
            for (var parameter in hourData[i].parameters) {
                if (hourData[i].parameters[parameter].name === "t") {
                    pTemp.innerHTML = formatDataWithCel(hourData[i].parameters[parameter].values[0]);
                }
                else if (hourData[i].parameters[parameter].name === "Wsymb2") {
                    var icon = getWeatherIcon(hourData[i].parameters[parameter].values[0]);
                    weatherIcon.classList.add(icon);
                }
            }
            div.append(pTime, weatherIcon, pTemp);
            container.append(div);
        }
    }
}
