const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;

startButton.addEventListener('click', startColourSwitch);
stopButton.addEventListener('click', stopColourSwitch);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startColourSwitch() {
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    body.style.backgroundColor = color;
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}
function stopColourSwitch() {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}
