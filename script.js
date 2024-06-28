const TIME = 30;
const MINUTE = 60;
const DOMAIN = "https://www.youtube.com";
const LINKS = [
  "zuCRSwWssVk",
  "uLwZxnEUeVE",
  "DSWYAclv2I8",
  "_BtXPQimVhg",
  "uvTs7YPIkhA",
];

let timer;
let isRunning = false;
let timeLeft = TIME * MINUTE;

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const orangeIconButton = document.getElementById("orange-icon");
const notificationSound = document.getElementById("notification-sound");

function randomizer() {
  return LINKS[Math.floor(Math.random() * LINKS.length)];
}

function orangeTrigger() {
  const link = randomizer();
  window.open(`${DOMAIN}/watch?v=${link}`, "_blank");
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / MINUTE);
  const seconds = timeLeft % MINUTE;
  minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    document.body.classList.add("running");
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        document.body.classList.remove("running");
        notificationSound.play();
        alert("Time's up!");
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    document.body.classList.remove("running");
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = TIME * MINUTE;
  document.body.classList.remove("running");
  updateDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
orangeIconButton.addEventListener("click", orangeTrigger);

updateDisplay();
