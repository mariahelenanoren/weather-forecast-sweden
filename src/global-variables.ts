const dateToday = new Date();
const year = dateToday.getFullYear();
const month = dateToday.getMonth();
const date = dateToday.getDate();
const hour = dateToday.getHours();

const cityArray = []

const favoritesList = [];

let isSearchFieldOpen: boolean;

interface chosenCity {
    locality: String,
    municipality: String,
    longitude: String,
    latitude: String
}

const chosenCity = {
    locality: "",
    municipality: "",
    latitude: "",
    longitude: "",
}