// =========================
// CHRONOMÈTRES INDÉPENDANTS
// =========================

// Fonction pour créer un chronomètre
function Chronometre(chronoId, startPauseId, resetId, storageKey) {
    this.chronoElement = document.getElementById(chronoId);
    this.startPauseBtn = document.getElementById(startPauseId);
    this.resetBtn = document.getElementById(resetId);

    this.seconds = parseInt(localStorage.getItem(storageKey)) || 0;
    this.timerRunning = false;
    this.interval = null;
    this.storageKey = storageKey;

    // Met à jour l'affichage du chrono
    this.updateDisplay = function () {
        let min = Math.floor(this.seconds / 60);
        let sec = this.seconds % 60;
        this.chronoElement.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    // Démarrer / Pause
    this.startPauseBtn.addEventListener("click", () => {
        if (this.timerRunning) {
            clearInterval(this.interval);
            this.startPauseBtn.textContent = "Start";
        } else {
            this.interval = setInterval(() => {
                this.seconds++;
                localStorage.setItem(this.storageKey, this.seconds);
                this.updateDisplay();
            }, 1000);
            this.startPauseBtn.textContent = "Pause";
        }
        this.timerRunning = !this.timerRunning;
    });

    // Reset
    this.resetBtn.addEventListener("click", () => {
        clearInterval(this.interval);
        this.seconds = 0;
        localStorage.setItem(this.storageKey, this.seconds);
        this.updateDisplay();
        this.startPauseBtn.textContent = "Start";
        this.timerRunning = false;
    });

    // Initialiser l'affichage
    this.updateDisplay();
}

// Créer deux chronomètres indépendants
const chrono1 = new Chronometre("chrono1", "startPause1", "resetChrono1", "chrono1Seconds");
const chrono2 = new Chronometre("chrono2", "startPause2", "resetChrono2", "chrono2Seconds");

// =========================
// COMPTEUR DE SÉRIES
// =========================

let counterValue = document.getElementById("counterValue");
let incrementBtn = document.getElementById("increment");
let decrementBtn = document.getElementById("decrement");
let resetCounterBtn = document.getElementById("resetCounter");

let count = parseInt(localStorage.getItem("seriesCount")) || 0;
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
