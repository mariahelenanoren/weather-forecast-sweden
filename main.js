window.addEventListener("load", main);

function main() {
    getApi();
    getCityList();
    setEventListeners();
}

function setEventListeners() {
}

async function getApi() {
    country = getCountryInput();
    try {
        const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + country + "&appid=b7971cfa6d28e17a0ec0694039f7dfaf")
        const data = await result.json();
        console.log(data)
    } catch(error) {
    }
}

async function getCityList() {
    try {
        const result = await fetch("./current.city.list.json")
        const data = await result.json();
        console.log(data)
    } catch(error) {
    }
}

function getCountryInput() {
    return "Ockelbo";
}