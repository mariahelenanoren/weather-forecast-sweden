function weatherMain() {
}

async function getData() {
    const stationKey = chosenStationKey
        Papa.parse("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/" + stationKey + "/period/corrected-archive/data.csv", {
            download: true,
            complete: function(results) {
                console.log(results);
            }
        });
}