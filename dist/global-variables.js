/** Date object */
var dateToday = new Date();
/** The current year */
var year = dateToday.getFullYear();
/** The current month */
var month = dateToday.getMonth() + 1; // +1 because month variable is zero-based
/** The current date */
var date = dateToday.getDate();
/** The current hour */
var hour = dateToday.getHours();
/** Array for all svenska stader */
var allCitiesList = [];
/** Array for favorite cities */
var favoritesList = [];
/** Search-field state */
var isSearchFieldOpen;
/** chosenCity Object */
var chosenCity = {
    locality: "",
    municipality: "",
    latitude: "",
    longitude: "",
};
