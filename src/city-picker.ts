function cityPickerMain() {
    loadLSIntoChosenCity();
    getSwedishCities();
    setEventListeners();
}


function setEventListeners() {
    const stationInput = document.querySelector("#station")
    const searchButton = document.querySelector("#station-btn")

    searchButton.addEventListener("click", function(event) {
        event.preventDefault()
        //transformSearchField()
        setCity();
        search();
    })

    stationInput.addEventListener("keydown", (event) => {
        getCitiesList(stationInput, event)
    });
    stationInput.addEventListener("focus", (event) => {
        emptyInputField(stationInput);
        transformInputField(event)
        getCitiesList(stationInput, event);
        toggleDataList();
    });
    stationInput.addEventListener("blur", (event) => {
        setTimeout( function() {
            toggleDataList();
            transformInputField(event)
        },100)
    });
}

async function getSwedishCities() {
    try {
        const result = await fetch("./se.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function addCitiesToDataList() {
    const data = await getSwedishCities();

    if (data) {
        const citiesList = []

        for (let city in data) {
            citiesList.push(data[city].city)
        }
    return citiesList;
    }
}

function search() {
    const inputField: HTMLInputElement = document.querySelector(".search input")
    if (inputField.value) {
        goToForecast();
    }
}

function goToForecast() {
    window.location.href = "../forecast.html"
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
        searchField.style.borderRadius = "0.8rem 0.8rem 0 0"
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
    } else if (event.type === "keydown" && dataList.length > 0) {
        searchField.style.borderRadius = "0.8rem 0.8rem 0 0"
    }
    else if (event.type === "keydown" && dataList.length <= 0) {
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
    const citiesList = await addCitiesToDataList();
    const inputValue = input.value

    showCitiesInDataList(inputValue, citiesList, event)
}

function showCitiesInDataList(inputValue, citiesList, event) {
    const dataList = document.querySelector("#stations-list")
    emptyDataList(dataList);

   for (let city in citiesList) {
       if ((inputValue.toLowerCase()) === (citiesList[city].slice(0, inputValue.length).toLowerCase())) {
            const li = document.createElement("li")
            li.innerHTML = citiesList[city]
            dataList.append(li)
            li.addEventListener("click", () => {
                presentCityInInput(li)
                setCity()
                goToForecast()
            })
       }
   }
   transformInputField(event);
}

function emptyDataList(dataList) {
    dataList.innerHTML = "";
}

function presentCityInInput(li) {
    const stationInput: HTMLInputElement = document.querySelector("#station")
    stationInput.value = li.innerHTML;
}

async function setCity() {
    const data = await getSwedishCities();
    const stationInput: HTMLInputElement = document.querySelector("#station")
    const cityName = stationInput.value

    for (let city in data) {
        if (cityName.toLowerCase() === data[city].city.toLowerCase()) {
            chosenCity.name = data[city].city
            chosenCity.lon = data[city].lng
            chosenCity.lat = data[city].lat
        }
    }
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