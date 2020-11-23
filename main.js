window.addEventListener("load", main);

function main() {
    getApi();
    setEventListeners();
}

function setEventListeners() {
    const stationInput = document.querySelector("#station")

    stationInput.addEventListener("keyup", () => displayStationsList(stationInput))
    //stationInput.addEventListener("blur", displayStationsList)
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

async function addStationsToDataList() {
    const data = await getStationsList();

    if (data) {
        const stationsList = []
        const stations = data.station

        for (station in stations) {
            stationsList.push(stations[station].name)
        }
    return stationsList;
    }
}

async function displayStationsList(input) {
    const stationsList = await addStationsToDataList();
    const inputValue = input.value

    showStationsInDataList(inputValue, stationsList)
}

function showStationsInDataList(inputValue, stationsList) {
    const dataList = document.querySelector("#stations-list")
    console.log(inputValue)
    console.log(inputValue.length)
    emptyDataList(dataList);

   for (station in stationsList) {
       if (inputValue.toLowerCase() === stationsList[station].slice(0, inputValue.length).toLowerCase()) {
            console.log(stationsList[station])
            const li = document.createElement("li")
            li.innerHTML = stationsList[station]
            dataList.append(li)
       }
   }
}

function emptyDataList(dataList) {
    dataList.innerHTML = "";
}



