window.addEventListener("load", main);

function main() {
    getApi();
    addCitiesToDatalist();
    setEventListeners();
    getCityList();
}

function setEventListeners() {
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

async function getCityList() {
    console.log("hello")
    try {
        const result = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1.json")
        const data = await result.json();
        console.log(data)
    } catch(error) {
    }
}

function getCountryInput() {
    return "Sweden";
}

async function addCitiesToDatalist() {
    const weatherAPI = await getApi();

    if (weatherAPI) {
        console.log(weatherAPI)
    }
}



