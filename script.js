const TIME = parseFloat(prompt("Study Time (minutes): ")) || 30;
const BREAK_TIME = TIME / 5;
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
let breakTimer;
let isRunning = false;
let isBreakRunning = false;
let timeLeft = TIME * MINUTE;
let breakTimeLeft = BREAK_TIME * MINUTE;
let pomodoroCount = localStorage.getItem("pomodoroCount")
  ? parseInt(localStorage.getItem("pomodoroCount"))
  : 0;

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const breakMinutesDisplay = document.getElementById("break-minutes");
const breakSecondsDisplay = document.getElementById("break-seconds");
const pomodoroCountDisplay = document.getElementById("pomodoro-count");
const warningSound = document.getElementById("warning-sound");
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

function updateBreakDisplay() {
  const minutes = Math.floor(breakTimeLeft / MINUTE);
  const seconds = breakTimeLeft % MINUTE;
  breakMinutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
  breakSecondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
}

function updateCounter() {
  pomodoroCount++;
  localStorage.setItem("pomodoroCount", pomodoroCount);
  pomodoroCountDisplay.textContent = pomodoroCount;
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
        updateCounter();
        startBreakTimer();
      }
    }, 1000);
  }
}

function startBreakTimer() {
  if (!isBreakRunning) {
    isBreakRunning = true;
    breakTimer = setInterval(() => {
      if (breakTimeLeft > 0) {
        breakTimeLeft--;
        updateBreakDisplay();
      } else {
        clearInterval(breakTimer);
        isBreakRunning = false;
        notificationSound.play();
        resetTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    document.body.classList.remove("running");
  } else if (isBreakRunning) {
    clearInterval(breakTimer);
    isBreakRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  clearInterval(breakTimer);
  isRunning = false;
  isBreakRunning = false;
  timeLeft = TIME * MINUTE;
  breakTimeLeft = BREAK_TIME * MINUTE;
  document.body.classList.remove("running");
  updateDisplay();
  updateBreakDisplay();
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (isRunning) {
      pauseTimer();
      warningSound.play();
    }
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
orangeIconButton.addEventListener("click", orangeTrigger);

document.addEventListener("visibilitychange", handleVisibilityChange);

updateDisplay();
updateBreakDisplay();
pomodoroCountDisplay.textContent = pomodoroCount;
