/** Date object */
const dateToday: Date = new Date();
/** The current year */
const year: number = dateToday.getFullYear();
/** The current month */
const month: number = dateToday.getMonth() + 1; // +1 because month variable is zero-based
/** The current date */
const date: number = dateToday.getDate();
/** The current hour */
const hour: number = dateToday.getHours();

/** Array for all svenska stader */
const allCitiesList = []

/** Array for favorite cities */
const favoritesList = [];

/** Search-field state */
let isSearchFieldOpen: boolean;

interface chosenCity {
    locality: String,
    municipality: String,
    longitude: String,
    latitude: String
}

/** chosenCity Object */
const chosenCity = {
    locality: "",
    municipality: "",
    latitude: "",
    longitude: "",
}