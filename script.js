//prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//prettier-ignore
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const time_boxes = document.querySelectorAll(".deadline-format h4");

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDay();

//prettier-ignore
let futureDate = new Date(currentYear, currentMonth, currentDay+20, 18, 30, 00);

const futureYear = futureDate.getFullYear();
const futureMonth = months[futureDate.getMonth()];
const futureWeekDay = weekdays[futureDate.getDay()];
const futureDay = futureDate.getDate();
const futureHour = futureDate.getHours();
const futureMinutes = futureDate.getMinutes();
const futureTime = futureDate.getTime();

const format = (value) => (value < 10 ? (value = `0${value}`) : value);

giveaway.innerHTML = `giveaway ends on ${futureWeekDay}, ${futureDay} ${futureMonth} ${futureYear}, ${futureHour}:${format(
  futureMinutes
)}`;

const getRemainingTime = () => {
  const currentTime = new Date().getTime();
  const timeDiff = futureTime - currentTime;

  //1d = 24h
  //1h = 60m
  //1m = 60s
  //1s = 1000ms

  //values in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  let days = Math.floor(timeDiff / oneDay);
  let hours = Math.floor((timeDiff % oneDay) / oneHour);
  let minutes = Math.floor((timeDiff % oneHour) / oneMinute);
  let seconds = Math.floor((timeDiff % oneMinute) / oneSecond);

  let values = [days, hours, minutes, seconds];

  time_boxes.forEach((h4, i) => (h4.innerHTML = format(values[i])));

  if (timeDiff < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
  }
};

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
