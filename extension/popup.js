let timerId;

let user_info = {
  username : "",
  email : "",
  phone : ""
}
let timer_data = {
  hours : 0,
  minutes : 0,
  seconds : 0
}
// if no data saved (first use), initialize " " and 0s
if(localStorage.getItem("user") === undefined){
  localStorage.setItem("user", JSON.stringify(user_info))
}
if(localStorage.getItem("timer") === undefined){
  localStorage.setItem("timer", JSON.stringify(timer_data));
}

function showTimeLimitContainer() {
  const setTimeLimitButton = document.getElementById('set-time-limit');
  const setTimeLimitContainer = document.querySelector('.set-time-limit-container');
  const setUserInfoButton = document.getElementById('set-user-info');
  const setUserInfoContainer = document.querySelector('.set-user-info-container');
  setTimeLimitButton.addEventListener('click', () => {
    console.log("clicked");
    setTimeLimitButton.style.display = 'none';
    setTimeLimitContainer.style.display = 'block';
  });
  setUserInfoButton.addEventListener('click', () => {
    console.log("clicked");
    setUserInfoButton.style.display = 'none';
    setUserInfoContainer.style.display = 'block';
  });
}

function startTimer() {
  // RETRIEVE timer info from localStorage (Database)
  const timeInMs =(( parseInt(JSON.parse(localStorage.getItem("timer")).hours) * 60 * 60) + parseInt(JSON.parse(localStorage.getItem("timer")).minutes) * 60) * 1000;
  console.log(timeInMs);
  timerId = setTimeout(() => {
    // Close the Amazon tab
    chrome.tabs.query({ url: 'https://www.amazon.com/*' }, (tabs) => {
      alert(`Stop Shopping! You've reached your time limit of ${timer_data.hours} hours and ${timer_data.minutes} minutes.`);
      tabs.forEach(tab => {
        chrome.tabs.remove(tab.id);
      });
    });
  }, timeInMs);
}

document.addEventListener('DOMContentLoaded', () => {
  showTimeLimitContainer();
  console.log(JSON.parse(localStorage.getItem("user")).username);

  // RETRIEVE stored user info and timer data on page load.
  // only pre-filling forms
  document.getElementById('name').value = JSON.parse(localStorage.getItem("user")).username;
  document.getElementById('email').value = JSON.parse(localStorage.getItem("user")).email;
  document.getElementById('phone').value = JSON.parse(localStorage.getItem("user")).phone;
  document.getElementById('hours').value = JSON.parse(localStorage.getItem("timer")).hours;
  document.getElementById('minutes').value = JSON.parse(localStorage.getItem("timer")).minutes;
  document.getElementById('seconds').value = JSON.parse(localStorage.getItem("timer")).seconds;
  
  // STORE user input to localStorage (Database)
  // when changed (form submission)
  document.querySelector('.user_form').addEventListener('submit', (e) =>{
    user_info.username = document.getElementById('name').value;
    user_info.email = document.getElementById('email').value;
    user_info.phone = document.getElementById('phone').value;
    localStorage.setItem("user", JSON.stringify(user_info));
    console.log(JSON.parse(localStorage.getItem("user")));
    e.preventDefault();
    document.getElementById('set-user-info').style.display = "block";
    document.querySelector('.set-user-info-container').style.display = "none";
  })
  document.querySelector('.timer_form').addEventListener('submit', (e) =>{
    timer_data.hours = parseInt(document.getElementById('hours').value);
    hours = timer_data.hours;
    timer_data.minutes = parseInt(document.getElementById('minutes').value);
    minutes = timer_data.minutes;
    timer_data.minutes = parseInt(document.getElementById('seconds').value);
    seconds = timer_data.seconds;
    localStorage.setItem("timer", JSON.stringify(timer_data));
    console.log(JSON.parse(localStorage.getItem("timer")));
    e.preventDefault();
    document.getElementById('set-time-limit').style.display = "block";
    document.querySelector('.set-time-limit-container').style.display = "none";
  })

  document.getElementById('start-timer').addEventListener('click', () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    startTimer();
  });
});

const countdown = () => {
  // Specify the date and time we are counting down to.
  const countDate = new Date("May 21, 2023 00:00:00").getTime();
  const now = new Date().getTime();
  const remainingTime = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(remainingTime / day);
  const textHour = Math.floor((remainingTime % day) / hour);
  const textMinute = Math.floor((remainingTime % hour) / minute);
  const textSecond = Math.floor((remainingTime % minute) / second);

  document.querySelector(".day").innerText = textDay > 0 ? textDay : 0;
  document.querySelector(".hour").innerText = textHour > 0 ? textHour : 0;
  document.querySelector(".minute").innerText = textMinute > 0 ? textMinute : 0;
  document.querySelector(".second").innerText = textSecond > 0 ? textSecond : 0;
};

// should use 500 as setInterval won't always run on time.
setInterval(countdown, 500);
