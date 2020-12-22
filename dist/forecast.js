var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getForecast(lon, lat) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + lon + "/lat/" + lat + "/data.json")];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function presentForecastData() {
    return __awaiter(this, void 0, void 0, function () {
        var chosenCityLS, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chosenCityLS = getChosenCity();
                    return [4 /*yield*/, getForecast(chosenCityLS.lon, chosenCityLS.lat)];
                case 1:
                    data = _a.sent();
                    presentForecastForToday(data);
                    present30HForecast(data);
                    present9DayForecast(data);
                    return [2 /*return*/];
            }
        });
    });
}
function presentForecastForToday(data) {
    var todaysData;
    /* Accounts for late data updates */
    if (formatHour(data.timeSeries[0].validTime) === hour + ":00") {
        todaysData = data.timeSeries[0];
    }
    else {
        todaysData = data.timeSeries[1];
    }
    var temp;
    var wind;
    var parameters = todaysData.parameters;
    /* Accounts for irregularities in parameter index */
    for (var parameter in parameters) {
        switch (parameters[parameter].name) {
            case "t":
                presentTemp(parameters[parameter]);
                temp = parameters[parameter].values[0];
                break;
            case "vis":
                presentVisibility(parameters[parameter]);
                break;
            case "r":
                presentHumidity(parameters[parameter]);
                break;
            case "ws":
                presentWind(parameters[parameter]);
                wind = parameters[parameter].values[0];
                break;
            case "msl":
                presentAirPressure(parameters[parameter]);
                break;
            default:
                break;
        }
    }
    presentCityName();
    presentExpTemp(temp, wind);
    changeFavoriteSymbol();
}
function presentTemp(data) {
    var tempTarget = document.querySelector("#temp");
    var tempData = data.values[0];
    tempTarget.innerHTML = formatDataWithDeg(tempData);
}
function presentCityName() {
    var chosenCityLS = getChosenCity();
    var cityTarget = document.querySelector("#name");
    cityTarget.innerHTML = chosenCityLS.name;
}
function formatDataWithDeg(data) {
    var formattedData = Math.round(data) + "&deg;";
    return formattedData;
}
function formatDataWithCel(data) {
    var formattedData = Math.round(data) + "&deg;C";
    return formattedData;
}
function presentVisibility(data) {
    var visibilityTarget = document.querySelector("#visibility");
    var visibilityData = data.values[0];
    var visibility = Math.round(visibilityData);
    visibilityTarget.innerHTML = visibility + " km";
}
function presentHumidity(data) {
    var humidityTarget = document.querySelector("#humidity");
    var humidityData = data.values[0];
    humidityTarget.innerHTML = humidityData + "&#37;";
}
function presentExpTemp(temp, wind) {
    var expTempTarget = document.querySelector("#exp-temp");
    var expTemp = calculateExpTemp(temp, wind);
    expTempTarget.innerHTML = expTemp + "&deg;C";
}
function calculateExpTemp(tempData, windData) {
    var expTemp;
    if (tempData <= 10 && tempData >= -40 && windData >= 2 && windData <= 35) {
        expTemp = 13.12 + (0.6215 * tempData) - (13.956 * Math.pow(windData, 0.16)) + (0.48669 * tempData * Math.pow(windData, 0.16)); // Wind chill formula from SMHI
        expTemp = Math.round(expTemp);
    }
    else {
        expTemp = Math.round(tempData);
    }
    return expTemp;
}
function presentWind(data) {
    var windTarget = document.querySelector("#wind");
    var windData = data.values[0];
    var wind = Math.round(windData);
    windTarget.innerHTML = wind + " m/s";
}
function presentAirPressure(data) {
    var airPressureTarget = document.querySelector("#air-pressure");
    var airPressureData = data.values[0];
    var airPressure = Math.round(airPressureData);
    airPressureTarget.innerHTML = airPressure + " hPa";
}
function changeFavoriteSymbol() {
    var cityName = chosenCity.name;
    if (checkIfFavorite(cityName)) {
        document.querySelector("#favorite").innerHTML = "favorite";
    }
}
function present30HForecast(data) {
    var container = document.querySelector(".hourly-forecast-inner");
    var hourData = data.timeSeries;
    var skipFirstHour;
    skipFirstHour = false;
    for (var i = 0; i < 31; i++) {
        /* Accounts for late data updates */
        if (formatSingleDigitValues(hour - 1) + ":00" === formatHour(hourData[i].validTime)) {
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
                pTime.innerHTML = formatHour(hourData[i].validTime);
            }
            var span = document.createElement("span");
            span.setAttribute("class", "material-icons");
            span.innerHTML = "brightness_2"; // Change this to fit weather
            var pTemp = document.createElement("p");
            pTemp.setAttribute("class", "hour-temp normal");
            /* Accounts for irregularities in parameter index */
            for (var parameter in hourData[i].parameters) {
                if (hourData[i].parameters[parameter].name === "t") {
                    pTemp.innerHTML = formatDataWithCel(hourData[i].parameters[parameter].values[0]);
                }
            }
            div.append(pTime, span, pTemp);
            container.append(div);
        }
    }
}
function formatHour(data) {
    var date = data;
    var time = date.split("T");
    time = time[1];
    var timeSets = time.split(":");
    var hour = timeSets[0] + ":00";
    return hour;
}
function present9DayForecast(data) {
    var dayData = data.timeSeries;
    var container = document.querySelector(".weekly-forecast");
    for (var d = 0; d < 10; d++) {
        var validYear = Number(year);
        var validMonth = Number(month) + 1; // +1 because month variable is zero-based
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
                /* Accounts for irregularities in parameter index */
                for (var parameter in dayData[i].parameters) {
                    if (dayData[i].parameters[parameter].name === "t") {
                        pTemp.innerHTML = formatDataWithCel(dayData[i].parameters[parameter].values[0]);
                    }
                }
                var span = document.createElement("span");
                span.setAttribute("class", "material-icons");
                span.innerHTML = "brightness_2"; // Change this to fit weather
                div.append(pTemp, span);
                innerContainer.append(pDate, div);
                container.append(innerContainer);
            }
        }
    }
}
function getNameOfMonth(month) {
    switch (month) {
        case 1: return "januari";
        case 2: return "februari";
        case 3: return "mars";
        case 4: return "april";
        case 5: return "maj";
        case 6: return "juni";
        case 7: return "juli";
        case 8: return "augusti";
        case 9: return "september";
        case 10: return "oktober";
        case 11: return "november";
        case 12: return "december";
    }
}
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
function formatSingleDigitValues(data) {
    var formattedData = String(data);
    if (formattedData.length < 2) {
        formattedData = "0" + formattedData;
    }
    return formattedData;
}
function checkEndOfYear(month, day) {
    var currentYear = year;
    if (month === 12 && day > 31) {
        currentYear += 1;
    }
    return currentYear;
}
function checkEndOfMonth(month, day) {
    var daysInMonth = getDaysInMonth(year, month);
    var nextMonth = false;
    if (day > daysInMonth) {
        nextMonth = true;
    }
    return nextMonth;
}
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
;
