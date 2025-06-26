const timer = document.getElementById("timerDisplay");

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

        if (!workLength || !breakLength) {
            return;
        }

        timeLeft = workLength * 60;
        $(".displayKnob").trigger(
            'configure',
            {
                "max": workLength * 60,
            }
        );

        runTimer = true;
        timerID = setInterval(countDown, 1000);
    } else if (runTimer == true) {
        runTimer = false
        clearInterval(timerID);
    }
}

function resetTimer() {
    runTimer = false;
    clearInterval(timerID);

    workLength = undefined;
    breakLength = undefined;
    updateClock(0);
}

function countDown() {
    updateClock(timeLeft)

    //counts down one second if theres time left
    //switches to the next cycle if time is zero
    if (timeLeft > 0) {
        timeLeft = timeLeft - 1;
    } else if (timeLeft <= 0) {
        if (work == true) {
            timeLeft = breakLength * 60;
            work = false;
            $(".displayKnob").trigger(
                'configure',
                {
                    "max": breakLength * 60,
                }
            );
        } else if (work == false) {
            timeLeft = workLength * 60;
            work = true;

            $(".displayKnob").trigger(
                'configure',
                {
                    "max": workLength * 60,
                }
            );
        }
    }

}

//formats and updates the clock HTML div with the provided argument
//timeLeft (in seconds)
function updateClock(timeLeft) {
    minutes = Math.floor(timeLeft / 60);
    seconds = timeLeft % 60;
    $(".displayKnob").val(timeLeft).trigger("change")

    //timerString = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
    //timer.innerHTML = timerString;    
}

$(function () {
    $(".workKnob").knob({
        value: 0,
        min: 0,
        max: 60,
        stopper: false,
        thickness: 0.25,

        fgColor: "#000000",

        'release': function (v) { workLength = v; },
    });

    $(".breakKnob").knob({
        value: 0,
        min: 0,
        max: 60,
        stopper: false,
        thickness: 0.25,
        fgColor: "#b2b2b2",

        'release': function (v) { breakLength = v; },
    });

    $(".displayKnob").knob({
        min: 0,
        stopper: false,
        thickness: 0.25,
        fgColor: "#000000",
    });

});

