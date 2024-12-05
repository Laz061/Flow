
function updateClock() {
    const now = new Date();

    //24 HR const hours = now.getHours().toString().padStart(2, 0);

    let hours = now.getHours().toString().padStart(2, 0);
    const meridiem = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12; //if hours % 12 = 0 then 12 will be displayed
    hours = hours.toString().padStart(2, 0);

    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);

    //24 HR const timeString = `${hours}:${minutes}:${seconds}`;
    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;


    document.getElementById("clock").textContent = timeString;
}

updateClock()
setInterval(updateClock, 1000);

