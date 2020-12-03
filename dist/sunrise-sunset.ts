async function getSun() {
    const lon = chosenCity.lon
    const lat = chosenCity.lat
    try {
        const result = await fetch("https://api.sunrise-sunset.org/json?lat=" + lat +"&lng=" + lon + "&date=today")
        const data = await result.json()
        return data;
    } catch(error) {
    }
}

async function showSun() {
    const data = await getSun();
    console.log(data)
}