// =========================
// CHRONOMÈTRES PRÉCIS AVEC MILLISECONDES
// =========================

function Chronometre(chronoId, startPauseId, resetId, storageKey) {
    this.chronoElement = document.getElementById(chronoId);
    this.startPauseBtn = document.getElementById(startPauseId);
    this.resetBtn = document.getElementById(resetId);

    this.startTime = localStorage.getItem(storageKey + "_start") ? parseInt(localStorage.getItem(storageKey + "_start")) : null;
    this.elapsedTime = localStorage.getItem(storageKey + "_elapsed") ? parseInt(localStorage.getItem(storageKey + "_elapsed")) : 0;
    this.timerRunning = this.startTime !== null; // Vérifie si un chrono était en cours
    this.interval = null;
    this.storageKey = storageKey;

    // Mise à jour de l'affichage du chrono
    this.updateDisplay = function () {
        let elapsed = this.timerRunning ? Date.now() - this.startTime + this.elapsedTime : this.elapsedTime;
        let totalSeconds = Math.floor(elapsed / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let milliseconds = elapsed % 1000;

        this.chronoElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
    };

    // Démarrer / Pause
    this.startPauseBtn.addEventListener("click", () => {
        if (this.timerRunning) {
            // Pause
            this.elapsedTime += Date.now() - this.startTime;
            localStorage.setItem(this.storageKey + "_elapsed", this.elapsedTime);
            localStorage.removeItem(this.storageKey + "_start"); // Supprime l'heure de départ
            clearInterval(this.interval);
            this.startPauseBtn.textContent = "Start";
        } else {
            // Start
            this.startTime = Date.now();
            localStorage.setItem(this.storageKey + "_start", this.startTime);
            this.interval = setInterval(() => this.updateDisplay(), 10); // Mise à jour toutes les 10ms
            this.startPauseBtn.textContent = "Pause";
        }
        this.timerRunning = !this.timerRunning;
    });

    // Reset
    this.resetBtn.addEventListener("click", () => {
        clearInterval(this.interval);
        localStorage.removeItem(this.storageKey + "_start");
        localStorage.removeItem(this.storageKey + "_elapsed");
        this.startTime = null;
        this.elapsedTime = 0;
        this.updateDisplay();
        this.startPauseBtn.textContent = "Start";
        this.timerRunning = false;
    });

    // Redémarrer le chrono si nécessaire après un rechargement
    if (this.timerRunning) {
        this.interval = setInterval(() => this.updateDisplay(), 10);
    }

    // Initialiser l'affichage
    this.updateDisplay();
}

// Créer deux chronomètres indépendants avec millisecondes
const chrono1 = new Chronometre("chrono1", "startPause1", "resetChrono1", "chrono1");
const chrono2 = new Chronometre("chrono2", "startPause2", "resetChrono2", "chrono2");

// =========================
// COMPTEUR DE SÉRIES PERSISTANT
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
