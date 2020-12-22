/** Functions to be run on window load */
function cityPickerMain() {
    loadLSIntoChosenCity();
    parseSvenskaStader();
    setEventListeners();
}

/** Sets event listeners */
function setEventListeners() {
    const searchIcon: HTMLSpanElement = document.querySelector("#search-icon")
    const stationInput: HTMLInputElement = document.querySelector("#city")

    searchIcon.addEventListener("click",(event) => changeSearchFieldState(event))
    stationInput.addEventListener("keyup", (event) => {
        insertCitiesInDataList(stationInput, event)
    });
    stationInput.addEventListener("focus", (event) => {
        emptyInputField(stationInput);
        transformInputField(event)
        toggleCityList();
        emptyCityList()
    });
    stationInput.addEventListener("blur", (event) => {
        setTimeout( function() {
            toggleCityList();
            changeSearchFieldState(event)
            transformInputField(event)
        },100)
    });
    window.addEventListener("resize", (event) => changeSearchFieldState(event))
}

/** Gets svenska stader */
async function getSvenskaStader() {
    try {
        const result = await fetch("svenska-stader-master/src/svenska-stader.csv")
        const data = await result.text()
        return data;
    } catch(error) {
        console.log(error)
    }
}

/** Manually parses svenska stader */
async function parseSvenskaStader() {
    const data = await getSvenskaStader();
    const dataArray = data.split("\n")
    for (const city in dataArray) {
        const parameters = dataArray[city].split(",")
        const cityObject = {
            locality: parameters[0],
            municipality: parameters[1],
            county: parameters[2],
            latitude: parameters[3],
            longitude: parameters[4]
        }
        if (cityObject.locality !== "" && cityObject.locality !== "Locality") {
            allCitiesList.push(cityObject)
        }
    }
}

/** Loads local storage into chosenCity */
function loadLSIntoChosenCity() {
    const chosenCityLS = getChosenCityLS()
    if (chosenCityLS) {
        chosenCity.locality = chosenCityLS.locality
        chosenCity.municipality = chosenCityLS.municipality
        chosenCity.longitude = chosenCityLS.longitude
        chosenCity.latitude = chosenCityLS.latitude   
    }
}

/* Inserts cities into city-list */
function insertCitiesInDataList(input: HTMLInputElement, event: Event) {
    const inputValue: string = input.value
    const dataList: HTMLUListElement = document.querySelector("#city-list")
    emptyCityList();

   for (let city in allCitiesList) {
       if ((inputValue.toLowerCase()) === (allCitiesList[city].locality.slice(0, inputValue.length).toLowerCase())) {
            const li = document.createElement("li")
            if (allCitiesList[city].locality !== allCitiesList[city].municipality) {
                li.innerHTML = allCitiesList[city].locality + ", " + allCitiesList[city].municipality
            } else {
                li.innerHTML = allCitiesList[city].locality
            }
            li.setAttribute("index", city)
            dataList.append(li)
            li.addEventListener("click", () => {
                presentCityInInput(li)
                setCity(li.getAttribute("index"))
                goToForecast()
            })
       }
   }
   transformInputField(event);
}

/** Redirects window to city-forecast.html */
function goToForecast() {
    window.location.href = "./city-forecast.html"
}

/** Changes state of search-field */
function changeSearchFieldState(event: Event) {
    if (event.type === "load" || event.type === "resize" || event.type === "blur") {
        isSearchFieldOpen = false;
    } else if (event.type === "click") {
        if (isSearchFieldOpen === false) {
            isSearchFieldOpen = true;
        } else if (isSearchFieldOpen === true) {
            isSearchFieldOpen = false;
        }
    }
    transformSearchField(isSearchFieldOpen)
}

/** Transforms the search field for mobile devices */
function transformSearchField(isSearchFieldOpen: boolean) {
    const inputField: HTMLInputElement = document.querySelector(".search input")
    const searchField: HTMLInputElement = document.querySelector(".search-field")
    const headerNav: HTMLDivElement = document.querySelector("#header-nav")
    if (isSearchFieldOpen && window.innerWidth <= 480) {
        headerNav.style.opacity = "0%";
        headerNav.style.width = "0%"
        searchField.style.width = "100%";
        inputField.style.width = "100%";
        inputField.style.margin = "0 0 0 0.5rem";
        inputField.style.opacity = "100%";
        inputField.focus();
    } else if (!isSearchFieldOpen && window.innerWidth <= 480){
        headerNav.style.opacity = "100%";
        headerNav.style.width = "10rem"
        searchField.style.width = "2.4rem";
        inputField.style.width = "0%";
        inputField.style.margin = "0";
        inputField.style.opacity = "0%";
        inputField.blur()
    } else if (!isSearchFieldOpen && window.innerWidth > 480) {
        headerNav.style.opacity = "100%";
        headerNav.style.width = "8rem"
        searchField.style.width = "var(--search-bar-width)";
        inputField.style.width = "100%";
        inputField.style.margin = "0 0 0 0.5rem";
        inputField.style.opacity = "100%";
        inputField.blur()
    }
}

/* Transforms input-field */
function transformInputField(event: Event) {
    const inputField: HTMLInputElement = document.querySelector("#city")
    const searchField: HTMLDivElement = document.querySelector(".search-field .search")
    const searchButton: HTMLButtonElement = document.querySelector(".search span")
    const cityList = document.querySelectorAll("#city-list li")
    if (event.type === "focus") {
        searchField.style.borderRadius = "1.2rem"
        searchField.style.backgroundColor = "white"
        searchField.style.color = "black"
        inputField.style.color = "black"
        searchButton.style.color = "black"
    } else if (event.type === "blur") {
        searchField.style.borderRadius = "1.2rem"
        searchField.style.backgroundColor = "rgba(255, 255, 255, 0.35)"
        searchField.style.color = "white"
        inputField.style.color = "white"
        searchButton.style.color = "white"
    } else if (event.type === "keyup" && cityList.length > 0) {
        searchField.style.borderRadius = "0.8rem 0.8rem 0 0"
    }
    else if (event.type === "keyup" && cityList.length <= 0) {
        searchField.style.borderRadius = "1.2rem"
    }
}

/* Empties the city list */
function emptyCityList() {
    const cityList = document.querySelector("#city-list")
    cityList.innerHTML = "";
}

/* Presents city in input*/
function presentCityInInput(li) {
    const cityInput: HTMLInputElement = document.querySelector("#city")
    cityInput.value = li.innerHTML;
}

/* Sets chosenCity */
async function setCity(index) {
    chosenCity.locality = allCitiesList[index].locality
    chosenCity.municipality = allCitiesList[index].municipality
    chosenCity.longitude = allCitiesList[index].longitude
    chosenCity.latitude = allCitiesList[index].latitude

    setChosenCityLS()
}

/** Hides and shows the city list */
function toggleCityList() {
    const cityList = document.querySelector("#city-list")
    cityList.classList.toggle("hidden")
}

/** Empties the input-field */
function emptyInputField(input) {
    input.value = "";
}

/** Gets chosenCity from local storage */
function getChosenCityLS() {
    const chosenCityLS = JSON.parse(localStorage.getItem("chosenCity"))
    return chosenCityLS;
}

/** Saves chosenCity to local storage */
function setChosenCityLS() {
    localStorage.setItem("chosenCity", JSON.stringify(chosenCity))
}