function present30HForecast(data) {
    const container = document.querySelector(".hourly-forecast-inner")
    const hourData = data.timeSeries
    let skipFirstHour: boolean;
    skipFirstHour = false;

    for (let i = 0; i < 31; i++) {
        /* Accounts for late data updates */
        if (formatSingleDigitValues(hour - 1) + ":00" === formatHour(hourData[i].validTime)) {
            skipFirstHour = true;
        } else {
            const div = document.createElement("div")
            div.setAttribute("class", "hour-container flex column center")

            const pTime = document.createElement("p")
            if (i === 0 && skipFirstHour === false || i === 1 && skipFirstHour === true) {
                pTime.setAttribute("class", "semi-bold")
                pTime.innerHTML = "Nu"
            } else {
                pTime.setAttribute("class", "normal")
                pTime.innerHTML = formatHour(hourData[i].validTime)
            }
    
            const weatherIcon = document.createElement("i")
            weatherIcon.setAttribute("class", "wi")
    
            const pTemp = document.createElement("p")
            pTemp.setAttribute("class", "hour-temp normal")
            /* Accounts for irregularities in parameter index */
            for (const parameter in hourData[i].parameters) {
                if (hourData[i].parameters[parameter].name === "t") {
                    pTemp.innerHTML = formatDataWithCel(hourData[i].parameters[parameter].values[0])
                }
                else if (hourData[i].parameters[parameter].name === "Wsymb2") {
                    const icon = getWeatherIcon(hourData[i].parameters[parameter].values[0])
                    weatherIcon.classList.add(icon)
                }
            }
    
            div.append(pTime, weatherIcon, pTemp)
            container.append(div)
        }
    }
}