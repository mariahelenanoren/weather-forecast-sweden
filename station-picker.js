function stationPickerMain() {
    setEventListeners();
}

function setEventListeners() {
    const stationInput = document.querySelector("#station")

    stationInput.addEventListener("keyup", () => displayStationsList(stationInput))
    stationInput.addEventListener("focus", () => {
        emptyInputField(stationInput);
        toggleDataList();
        displayStationsList(stationInput);
    });
    stationInput.addEventListener("blur", () => setTimeout ( () => {
        toggleDataList();
    }, 100))
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
    emptyDataList(dataList);

   for (station in stationsList) {
       if ((inputValue.toLowerCase()) === (stationsList[station].slice(0, inputValue.length).toLowerCase())) {
            const li = document.createElement("li")
            li.innerHTML = stationsList[station]
            dataList.append(li)
            li.addEventListener("click", () => presentStationInInput(li))
       }
   }
}

function emptyDataList(dataList) {
    dataList.innerHTML = "";
}

function presentStationInInput(li) {
    const stationInput = document.querySelector("#station")
    stationInput.value = li.innerHTML;
}

async function setStation() {
    const data = await getStationsList();
    const stations = data.station
    const stationInput = document.querySelector("#station")
    const stationName = stationInput.value


    for (station in stations) {
        if (stationName === stations[station].name) {
            chosenStation.name = stations[station].name
            chosenStation.lon = stations[station].longitude
            chosenStation.lat = stations[station].latitude
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