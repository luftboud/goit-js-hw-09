import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

//current date
let currentDate = null;
//time left
let time = {};
//selected elements
const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
// const
//disabling button
startButton.disabled = true;
//selected date
let selectedDate = null;

setInterval(() => {
  currentDate = new Date().getTime();
}, 1000);
//options for flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    checkDate();
  },
};
flatpickr(input, options);

//listener
startButton.addEventListener('click', startedTimer);

//functions
function checkDate() {
  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;
    return;
  }
  startButton.disabled = false;
}
function startedTimer() {
  const timerId = setInterval(() => {
      convertMs(selectedDate - currentDate);
      dataDays.textContent = time.days.toString().padStart(2, "0");
      dataHours.textContent = time.hours.toString().padStart(2, '0');
      dataMinutes.textContent = time.minutes.toString().padStart(2, '0');
      dataSeconds.textContent = time.seconds.toString().padStart(2, '0');
  }, 1000);
  setInterval(() => {
    if (selectedDate - currentDate < 0) {
      clearInterval(timerId);
    }
  }, 100);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  time = { days, hours, minutes, seconds };
    console.log(time);
  return;
}

