
const workInput = document.getElementById("workLengthInput");
const breakInput = document.getElementById("breakLengthInput");
const timer = document.getElementById("timer");

//Boolean used to toggle Timer on and off
let runTimer = false;

//used to store setInterval function ID 
let timerID = undefined;

let workLength = undefined;
let breakLength = undefined;

//stores the time left in seconds in current cycle
let timeLeft = undefined;

let work = true;

function toggle() {

    if (runTimer == false) {

        if (!workInput.value || !breakInput.value) {
            return;
        }

        workLength = workInput.value;
        breakLength = breakInput.value;
        timeLeft = workLength * 60;

        //reset input boxes
        workInput.value = "";
        breakInput.value = "";

        runTimer = true;
        updateClock(timeLeft);
        timerID = setInterval(countDown, 1000);
    } else if (runTimer == true) {
        runTimer = false
        clearInterval(timerID);
    }
}

function countDown() {
    updateClock(timeLeft)

    //counts down one seconds if theres time left
    //switches to the next cycle if time is zero
    if (timeLeft > 0) {
        timeLeft = timeLeft - 1;
    } else if (timeLeft <= 0) {
        if (work == true) {
            timeLeft = breakLength * 60;
            work = false;
        } else if (work == false) {
            timeLeft = workLength * 60;
            work = true;
        }
    }

}

//formats and updates the clock HTML div with the provided argument
//timeLeft (in seconds)
function updateClock(timeLeft) {
    minutes = Math.floor(timeLeft / 60);
    seconds = timeLeft % 60;

    timerString = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
    timer.innerHTML = timerString;
}
