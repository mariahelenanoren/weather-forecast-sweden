const dateToday = new Date();
const year = dateToday.getFullYear();
const month = dateToday.getMonth();
const date = dateToday.getDate();
const hour = dateToday.getHours();

const cityArray = []

const favoritesList = [];

interface chosenCity {
    name: String,
    lon: String,
    lat: String
}

const chosenCity = {
    name: "",
    lon: "",
    lat: ""
}