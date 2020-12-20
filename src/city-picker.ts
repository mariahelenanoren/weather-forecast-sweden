function cityPickerMain() {
    loadLSIntoChosenCity();
    parseSvenskaStader();
    setEventListeners();
}


function setEventListeners() {
    const searchIcon = document.querySelector("#search-icon")
    const stationInput = document.querySelector("#station")

    searchIcon.addEventListener("click",(event) => changeSearchFieldState(event))
    stationInput.addEventListener("keyup", (event) => {
        getCitiesList(stationInput, event)
    });
    stationInput.addEventListener("focus", (event) => {
        emptyInputField(stationInput);
        transformInputField(event)
        toggleDataList();
        emptyDataList()
    });
    stationInput.addEventListener("blur", (event) => {
        setTimeout( function() {
            toggleDataList();
            transformInputField(event)
        },100)
    });
    window.addEventListener("resize", (event) => changeSearchFieldState(event))
}

async function getSvenskaStader() {
    try {
        const result = await fetch("svenska-stader-master/src/svenska-stader.csv")
        const data = await result.text()
        return data;
    } catch(error) {
    }
}

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
            cityArray.push(cityObject)
        }
    }
}

function search() {
    const inputField: HTMLInputElement = document.querySelector(".search input")
    if (inputField.value) {
        goToForecast();
    }
}

function goToForecast() {
    window.location.href = "../city-forecast.html"
}

function changeSearchFieldState(event: Event) {
    if (event.type === "load" || event.type === "resize") {
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

/** MOBILE ONLY */
function transformSearchField(isSearchFieldOpen: boolean) {
    console.log(isSearchFieldOpen)
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
    } else if (!isSearchFieldOpen && window.innerWidth <= 480){
        headerNav.style.opacity = "100%";
        headerNav.style.width = "10rem"
        searchField.style.width = "2.4rem";
        inputField.style.width = "0%";
        inputField.style.margin = "0";
        inputField.style.opacity = "0%";
    } else if (!isSearchFieldOpen && window.innerWidth > 480) {
        headerNav.style.opacity = "100%";
        headerNav.style.width = "8rem"
        searchField.style.width = "var(--search-bar-width)";
        inputField.style.width = "100%";
        inputField.style.margin = "0 0 0 0.5rem";
        inputField.style.opacity = "100%";
    }
}

function transformInputField(event: Event) {
    const inputField: HTMLInputElement = document.querySelector("#station")
    const searchField: HTMLDivElement = document.querySelector(".search-field .search")
    const searchButton: HTMLButtonElement = document.querySelector(".search span")
    const dataList = document.querySelectorAll("#stations-list li")
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
    } else if (event.type === "keyup" && dataList.length > 0) {
        searchField.style.borderRadius = "0.8rem 0.8rem 0 0"
    }
    else if (event.type === "keyup" && dataList.length <= 0) {
        searchField.style.borderRadius = "1.2rem"
    }
}

function loadLSIntoChosenCity() {
    const chosenCityLS = getChosenCity()
    if (chosenCityLS) {
        chosenCity.locality = chosenCityLS.locality
        chosenCity.municipality = chosenCityLS.municipality
        chosenCity.longitude = chosenCityLS.longitude
        chosenCity.latitude = chosenCityLS.latitude   
    }
}

async function getCitiesList(input, event) {
    const inputValue = input.value

    showCitiesInDataList(inputValue, event)
}

function showCitiesInDataList(inputValue, event) {
    const dataList = document.querySelector("#stations-list")
    emptyDataList();

   for (let city in cityArray) {
       if ((inputValue.toLowerCase()) === (cityArray[city].locality.slice(0, inputValue.length).toLowerCase())) {
            const li = document.createElement("li")
            if (cityArray[city].locality !== cityArray[city].municipality) {
                li.innerHTML = cityArray[city].locality + ", " + cityArray[city].municipality
            } else {
                li.innerHTML = cityArray[city].locality
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

function emptyDataList() {
    const dataList = document.querySelector("#stations-list")
    dataList.innerHTML = "";
}

function presentCityInInput(li) {
    const stationInput: HTMLInputElement = document.querySelector("#station")
    stationInput.value = li.innerHTML;
}

async function setCity(index) {

    chosenCity.locality = cityArray[index].locality
    chosenCity.municipality = cityArray[index].municipality
    chosenCity.longitude = cityArray[index].longitude
    chosenCity.latitude = cityArray[index].latitude

    setChosenCity()
}

function toggleDataList() {
    const dataList = document.querySelector("#stations-list")
    dataList.classList.toggle("hidden")
}

function emptyInputField(input) {
    input.value = "";
}

function getChosenCity() {
    const chosenCityLS = JSON.parse(localStorage.getItem("chosenCity"))
    return chosenCityLS;
}

function setChosenCity() {
    localStorage.setItem("chosenCity", JSON.stringify(chosenCity))
}