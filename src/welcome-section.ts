function updateWelcomeSection() {
    const dateTarget = document.querySelector("#welcome-date")
    const currentMonth = getNameOfMonth(month)
    dateTarget.innerHTML = date + " " + currentMonth
}