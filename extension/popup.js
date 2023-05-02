let timerId;

let user_info = {
  username : "",
  email : "",
  phone : ""
}
let timer_data = {
  hours : 0,
  minutes : 0
}
let ticker = {
  days : 0,
  hours : 0,
  minutes : 0,
  seconds : 0,
}
// if no data saved (first use), initialize " " and 0s
if(localStorage.getItem("user") === null){
  localStorage.setItem("user", JSON.stringify(user_info))
}
if(localStorage.getItem("timer") === null){
  localStorage.setItem("timer", JSON.stringify(timer_data));
}
if(localStorage.getItem("ticker") === null){
  localStorage.setItem("ticker", JSON.stringify(ticker));
}

function showTimeLimitContainer() {
  const clock = document.getElementById('coming-soon');
  const setTimeLimitButton = document.getElementById('set-time-limit');
  const setTimeLimitContainer = document.querySelector('.set-time-limit-container');
  const setUserInfoButton = document.getElementById('set-user-info');
  const setUserInfoContainer = document.querySelector('.set-user-info-container');
  setTimeLimitButton.addEventListener('click', () => {
    console.log("clicked");
    clock.style.display='none';
    setTimeLimitButton.style.display = 'none';
    setUserInfoButton.style.display = 'none';
    setTimeLimitContainer.style.display = 'block';
  });
  setUserInfoButton.addEventListener('click', () => {
    console.log("clicked");
    clock.style.display='none';
    setUserInfoButton.style.display = 'none';
    setTimeLimitButton.style.display = 'none';
    setUserInfoContainer.style.display = 'block';
  });
}

function startTimer() {
  // RETRIEVE timer info from localStorage (Database)
  const timeInMs =(( parseInt(JSON.parse(localStorage.getItem("timer")).hours) * 60 * 60) + parseInt(JSON.parse(localStorage.getItem("timer")).minutes) * 60) * 1000;
  const eightyPercentComplete = Math.floor(timeInMs * 0.8);
  const urls = ['https://www.amazon.com/*', 'https://www.ebay.com/*', 'https://www.walmart.com/*']

  setTimeout(() => {
    const remainingTime = eightyPercentComplete / 1000; // convert to seconds
    if (remainingTime < 60) {
      alert(`Heads Up! You have 20% of your time remaining (${(timeInMs - eightyPercentComplete) * 0.001} seconds).`);
    } else {
      const remainingHours = Math.floor(remainingTime / 3600);
      const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
      alert(`Heads Up! You have 20% of your time remaining (${remainingHours} hours and ${remainingMinutes} minutes).`);
    }
  }, eightyPercentComplete);

  timerId = setTimeout(() => {
    // Close the tabs
    urls.forEach(link => {
      chrome.tabs.query({ url: link }, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.remove(tab.id);
        });
      });
    });
    alert(`Stop Shopping! You've reached your time limit of ${timer_data.hours} hours and ${timer_data.minutes} minutes.`);
  }, timeInMs);

  setInterval(countdown, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  showTimeLimitContainer();
  setInterval(update, 500);

  // RETRIEVE stored user info and timer data on page load.
  // only pre-filling forms
  document.getElementById('name').value = JSON.parse(localStorage.getItem("user")).username;
  document.getElementById('email').value = JSON.parse(localStorage.getItem("user")).email;
  document.getElementById('phone').value = JSON.parse(localStorage.getItem("user")).phone;
  document.getElementById('hours').value = JSON.parse(localStorage.getItem("timer")).hours;
  document.getElementById('minutes').value = JSON.parse(localStorage.getItem("timer")).minutes;

  // initialize timer to 0000
  document.querySelector(".day").innerText = ticker.days;
  document.querySelector(".hour").innerText = ticker.hours;
  document.querySelector(".minute").innerText = ticker.minutes;
  document.querySelector(".second").innerText = ticker.seconds;
  
  // STORE user input to localStorage (Database)
  // when changed (form submission)
  document.querySelector('.user_form').addEventListener('submit', (e) =>{
    user_info.username = document.getElementById('name').value;
    user_info.email = document.getElementById('email').value;
    user_info.phone = document.getElementById('phone').value;
    localStorage.setItem("user", JSON.stringify(user_info));
    localStorage.setItem("ticker", JSON.stringify(ticker));
    e.preventDefault();
    document.getElementById('header__logo').click();
  })
  document.querySelector('.timer_form').addEventListener('submit', (e) =>{
    timer_data.hours = parseInt(document.getElementById('hours').value);
    hours = timer_data.hours;
    timer_data.minutes = parseInt(document.getElementById('minutes').value);
    minutes = timer_data.minutes;
    localStorage.setItem("timer", JSON.stringify(timer_data));
    localStorage.setItem("ticker", JSON.stringify(ticker));
    e.preventDefault();
    document.getElementById('header__logo').click();
  })

  document.getElementById('start-timer').addEventListener('click', () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    startTimer();
  });
});

const Time =(( parseInt(JSON.parse(localStorage.getItem("timer")).hours) * 60 * 60) + parseInt(JSON.parse(localStorage.getItem("timer")).minutes) * 60) * 1000;
let remainingTime = Time-500;

const countdown = () => {
  remainingTime -= 500;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(remainingTime / day);
  const textHour = Math.floor((remainingTime % day) / hour);
  const textMinute = Math.floor((remainingTime % hour) / minute);
  const textSecond = Math.floor((remainingTime % minute) / second);

  document.querySelector(".day").innerText = textDay > 0 ? textDay : 0;
  ticker.days = textDay > 0 ? textDay : 0;
  document.querySelector(".hour").innerText = textHour > 0 ? textHour : 0;
  ticker.hours = textHour > 0 ? textHour : 0;
  document.querySelector(".minute").innerText = textMinute > 0 ? textMinute : 0;
  ticker.minutes = textMinute > 0 ? textMinute : 0;
  document.querySelector(".second").innerText = textSecond > 0 ? textSecond : 0;
  ticker.seconds = textSecond > 0 ? textSecond : 0;
};

const update = ()=>{
  console.log(JSON.stringify(ticker));
  localStorage.setItem("ticker", JSON.stringify(ticker));
}
