function updateWelcomeSection() {
    var dateTarget = document.querySelector("#welcome-date");
    var currentMonth = getNameOfMonth(month);
    dateTarget.innerHTML = date + " " + currentMonth;
}
