window.addEventListener("load", main);

function main() {
    getApi();
    setEventListeners();
    addCitiesToDatalist();
}

function setEventListeners() {
    const stationInput = document.querySelector("#station")

    stationInput.addEventListener("focus", displayStationsList)
    stationInput.addEventListener("blur", displayStationsList)
}

async function getApi() {
    country = getCountryInput();
    try {
        const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=country&appid=b7971cfa6d28e17a0ec0694039f7dfaf")
        const data = await result.json();
        console.log(data)
    } catch(error) {
    }
}

async function getStationsList() {
    try {
        const result = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1.json")
        const data = await result.json();
        return data;
    } catch(error) {
        console.error(error)
    }
}

function getCountryInput() {
    return "Sweden";
}

async function addCitiesToDatalist() {
    const parameterData = await getStationsList();

    if (parameterData) {
        const stations = parameterData.station

        for (station in stations) {
            const listContainer = document.querySelector("#stations-list")
            const li = document.createElement("li")
            li.innerHTML = stations[station].name
            listContainer.append(li)
        }
    }
}

function displayStationsList() {
    const stationsList = document.querySelector("#stations-list")

    stationsList.classList.toggle("hide")
}



