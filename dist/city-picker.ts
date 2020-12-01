function cityPickerMain() {
    setEventListeners();
    getSwedishCities();
}


function setEventListeners() {
    const cityInput = document.querySelector("#station")

    cityInput.addEventListener("keyup", () => displayCitiesList(cityInput))
    cityInput.addEventListener("focus", () => {
        emptyInputField(cityInput);
        toggleDataList();
        displayCitiesList(cityInput);
    });
    cityInput.addEventListener("blur", () => setTimeout ( () => {
        toggleDataList();
    }, 100))
}

async function getSwedishCities() {
    try {
        const result = await fetch("./se.json")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function getCitiesList() {
    try {
        const result = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1.json")
        const data = await result.json();
        return data;
    } catch(error) {
        console.error(error)
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

async function displayCitiesList(input) {
    const citiesList = await addCitiesToDataList();
    const inputValue = input.value

    showCitiesInDataList(inputValue, citiesList)
}

function showCitiesInDataList(inputValue, citiesList) {
    const dataList = document.querySelector("#stations-list")
    emptyDataList(dataList);

   for (let city in citiesList) {
       if ((inputValue.toLowerCase()) === (citiesList[city].slice(0, inputValue.length).toLowerCase())) {
            const li = document.createElement("li")
            li.innerHTML = citiesList[city]
            dataList.append(li)
            li.addEventListener("click", () => presentCityInInput(li))
       }
   }
}

function emptyDataList(dataList) {
    dataList.innerHTML = "";
}

function presentCityInInput(li) {
    const cityInput: HTMLInputElement = document.querySelector("#station")
    cityInput.value = li.innerHTML;
}

async function setCity() {
    const data = await getSwedishCities();
    const cityInput: HTMLInputElement = document.querySelector("#station")
    const cityName = cityInput.value

    for (let city in data) {
        if (cityName === data[city].city) {
            chosenCity.name = data[city].city
            chosenCity.lon = data[city].lng
            chosenCity.lat = data[city].lat
        }
    }
}

function toggleDataList() {
    const dataList = document.querySelector("#stations-list")
    dataList.classList.toggle("hidden")
}

function emptyInputField(input) {
    input.value = "";
}