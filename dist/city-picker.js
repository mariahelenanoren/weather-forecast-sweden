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
/** Functions to be run on window load */
function cityPickerMain() {
    loadLSIntoChosenCity();
    parseSvenskaStader();
    setEventListeners();
}
/** Sets event listeners */
function setEventListeners() {
    var searchIcon = document.querySelector("#search-icon");
    var stationInput = document.querySelector("#city");
    searchIcon.addEventListener("click", function (event) { return changeSearchFieldState(event); });
    stationInput.addEventListener("keyup", function (event) {
        insertCitiesInDataList(stationInput, event);
    });
    stationInput.addEventListener("focus", function (event) {
        emptyInputField(stationInput);
        transformInputField(event);
        toggleCityList();
        emptyCityList();
    });
    stationInput.addEventListener("blur", function (event) {
        setTimeout(function () {
            toggleCityList();
            changeSearchFieldState(event);
            transformInputField(event);
        }, 100);
    });
    window.addEventListener("resize", function (event) { return changeSearchFieldState(event); });
}
/** Gets svenska stader */
function getSvenskaStader() {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("svenska-stader-master/src/svenska-stader.csv")];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.text()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/** Manually parses svenska stader */
function parseSvenskaStader() {
    return __awaiter(this, void 0, void 0, function () {
        var data, dataArray, city, parameters, cityObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSvenskaStader()];
                case 1:
                    data = _a.sent();
                    dataArray = data.split("\n");
                    for (city in dataArray) {
                        parameters = dataArray[city].split(",");
                        cityObject = {
                            locality: parameters[0],
                            municipality: parameters[1],
                            county: parameters[2],
                            latitude: parameters[3],
                            longitude: parameters[4]
                        };
                        if (cityObject.locality !== "" && cityObject.locality !== "Locality") {
                            allCitiesList.push(cityObject);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/** Loads local storage into chosenCity */
function loadLSIntoChosenCity() {
    var chosenCityLS = getChosenCityLS();
    if (chosenCityLS) {
        chosenCity.locality = chosenCityLS.locality;
        chosenCity.municipality = chosenCityLS.municipality;
        chosenCity.longitude = chosenCityLS.longitude;
        chosenCity.latitude = chosenCityLS.latitude;
    }
}
/* Inserts cities into city-list */
function insertCitiesInDataList(input, event) {
    var inputValue = input.value;
    var dataList = document.querySelector("#city-list");
    emptyCityList();
    var _loop_1 = function (city) {
        if ((inputValue.toLowerCase()) === (allCitiesList[city].locality.slice(0, inputValue.length).toLowerCase())) {
            var li_1 = document.createElement("li");
            if (allCitiesList[city].locality !== allCitiesList[city].municipality) {
                li_1.innerHTML = allCitiesList[city].locality + ", " + allCitiesList[city].municipality;
            }
            else {
                li_1.innerHTML = allCitiesList[city].locality;
            }
            li_1.setAttribute("index", city);
            dataList.append(li_1);
            li_1.addEventListener("click", function () {
                presentCityInInput(li_1);
                setCity(li_1.getAttribute("index"));
                goToForecast();
            });
        }
    };
    for (var city in allCitiesList) {
        _loop_1(city);
    }
    transformInputField(event);
}
/** Redirects window to city-forecast.html */
function goToForecast() {
    window.location.href = "./city-forecast.html";
}
/** Changes state of search-field */
function changeSearchFieldState(event) {
    if (event.type === "load" || event.type === "resize" || event.type === "blur") {
        isSearchFieldOpen = false;
    }
    else if (event.type === "click") {
        if (isSearchFieldOpen === false) {
            isSearchFieldOpen = true;
        }
        else if (isSearchFieldOpen === true) {
            isSearchFieldOpen = false;
        }
    }
    transformSearchField(isSearchFieldOpen);
}
/** Transforms the search field for mobile devices */
function transformSearchField(isSearchFieldOpen) {
    var inputField = document.querySelector(".search input");
    var searchField = document.querySelector(".search-field");
    var headerNav = document.querySelector("#header-nav");
    if (isSearchFieldOpen && window.innerWidth <= 480) {
        headerNav.style.opacity = "0%";
        headerNav.style.width = "0%";
        searchField.style.width = "100%";
        inputField.style.width = "100%";
        inputField.style.margin = "0 0 0 0.5rem";
        inputField.style.opacity = "100%";
        inputField.focus();
    }
    else if (!isSearchFieldOpen && window.innerWidth <= 480) {
        headerNav.style.opacity = "100%";
        headerNav.style.width = "10rem";
        searchField.style.width = "2.4rem";
        inputField.style.width = "0%";
        inputField.style.margin = "0";
        inputField.style.opacity = "0%";
        inputField.blur();
    }
    else if (!isSearchFieldOpen && window.innerWidth > 480) {
        headerNav.style.opacity = "100%";
        headerNav.style.width = "8rem";
        searchField.style.width = "var(--search-bar-width)";
        inputField.style.width = "100%";
        inputField.style.margin = "0 0 0 0.5rem";
        inputField.style.opacity = "100%";
        inputField.blur();
    }
}
/* Transforms input-field */
function transformInputField(event) {
    var inputField = document.querySelector("#city");
    var searchField = document.querySelector(".search-field .search");
    var searchButton = document.querySelector(".search span");
    var cityList = document.querySelectorAll("#city-list li");
    if (event.type === "focus") {
        searchField.style.borderRadius = "1.2rem";
        searchField.style.backgroundColor = "white";
        searchField.style.color = "black";
        inputField.style.color = "black";
        searchButton.style.color = "black";
    }
    else if (event.type === "blur") {
        searchField.style.borderRadius = "1.2rem";
        searchField.style.backgroundColor = "rgba(255, 255, 255, 0.35)";
        searchField.style.color = "white";
        inputField.style.color = "white";
        searchButton.style.color = "white";
    }
    else if (event.type === "keyup" && cityList.length > 0) {
        searchField.style.borderRadius = "0.8rem 0.8rem 0 0";
    }
    else if (event.type === "keyup" && cityList.length <= 0) {
        searchField.style.borderRadius = "1.2rem";
    }
}
/* Empties the city list */
function emptyCityList() {
    var cityList = document.querySelector("#city-list");
    cityList.innerHTML = "";
}
/* Presents city in input*/
function presentCityInInput(li) {
    var cityInput = document.querySelector("#city");
    cityInput.value = li.innerHTML;
}
/* Sets chosenCity */
function setCity(index) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            chosenCity.locality = allCitiesList[index].locality;
            chosenCity.municipality = allCitiesList[index].municipality;
            chosenCity.longitude = allCitiesList[index].longitude;
            chosenCity.latitude = allCitiesList[index].latitude;
            setChosenCityLS();
            return [2 /*return*/];
        });
    });
}
/** Hides and shows the city list */
function toggleCityList() {
    var cityList = document.querySelector("#city-list");
    cityList.classList.toggle("hidden");
}
/** Empties the input-field */
function emptyInputField(input) {
    input.value = "";
}
/** Gets chosenCity from local storage */
function getChosenCityLS() {
    var chosenCityLS = JSON.parse(localStorage.getItem("chosenCity"));
    return chosenCityLS;
}
/** Saves chosenCity to local storage */
function setChosenCityLS() {
    localStorage.setItem("chosenCity", JSON.stringify(chosenCity));
}
