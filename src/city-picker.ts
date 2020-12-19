function cityPickerMain() {
    loadLSIntoChosenCity();
    parseSvenskaStader();
    setEventListeners();
}


function setEventListeners() {
    const stationInput = document.querySelector("#station")
    const searchButton = document.querySelector("#station-btn")

    searchButton.addEventListener("click", function(event) {
        event.preventDefault()
        //transformSearchField()
        search();
    })

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

/** MOBILE ONLY */
/*function transformSearchField() {
    const inputField: HTMLInputElement = document.querySelector(".search input")
    if (inputField.style.width === "15rem") {
        inputField.style.width = "0"
        inputField.style.opacity = "0"
        inputField.style.padding = "0"
    } else {
        inputField.style.width = "15rem"
        inputField.style.opacity = "1"
        inputField.style.padding = "0 0.5rem"
    }
}*/

function transformInputField(event: Event) {
    const inputField: HTMLInputElement = document.querySelector("#station")
    const searchField: HTMLDivElement = document.querySelector(".search-field .search")
    const searchButton: HTMLButtonElement = document.querySelector(".search button")
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
        chosenCity.name = chosenCityLS.name
        chosenCity.lon = chosenCityLS.lon
        chosenCity.lat = chosenCityLS.lat   
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

    if (cityArray[index].locality !== cityArray[index].municipality) {
        chosenCity.name = cityArray[index].locality + ", " + cityArray[index].municipality
    } else {
        chosenCity.name = cityArray[index].locality
    } 
    chosenCity.lon = cityArray[index].longitude
    chosenCity.lat = cityArray[index].latitude

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