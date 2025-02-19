// CHRONOMÈTRE
let chrono = document.getElementById("chrono");
let startPauseBtn = document.getElementById("startPause");
let resetChronoBtn = document.getElementById("resetChrono");

let seconds = localStorage.getItem("chronoSeconds") || 0;
let timerRunning = false;
let interval;

function updateChronoDisplay() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    chrono.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

startPauseBtn.addEventListener("click", function () {
    if (timerRunning) {
        clearInterval(interval);
        startPauseBtn.textContent = "Start";
    } else {
        interval = setInterval(() => {
            seconds++;
            localStorage.setItem("chronoSeconds", seconds);
            updateChronoDisplay();
        }, 1000);
        startPauseBtn.textContent = "Pause";
    }
    timerRunning = !timerRunning;
});

resetChronoBtn.addEventListener("click", function () {
    clearInterval(interval);
    seconds = 0;
    localStorage.setItem("chronoSeconds", seconds);
    updateChronoDisplay();
    startPauseBtn.textContent = "Start";
    timerRunning = false;
});

updateChronoDisplay();

// COMPTEUR DE SÉRIES
let counterValue = document.getElementById("counterValue");
let incrementBtn = document.getElementById("increment");
let decrementBtn = document.getElementById("decrement");
let resetCounterBtn = document.getElementById("resetCounter");

let count = localStorage.getItem("seriesCount") || 0;
counterValue.textContent = count;

incrementBtn.addEventListener("click", function () {
    count++;
    localStorage.setItem("seriesCount", count);
    counterValue.textContent = count;
});

decrementBtn.addEventListener("click", function () {
    if (count > 0) {
        count--;
        localStorage.setItem("seriesCount", count);
        counterValue.textContent = count;
    }
});

resetCounterBtn.addEventListener("click", function () {
    count = 0;
    localStorage.setItem("seriesCount", count);
    counterValue.textContent = count;
});
