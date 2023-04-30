let timerId;

let hours;
let minutes;

let user_info = {
  username : "",
  email : "",
  phone : ""
}
let timer_data = {
  hours : 0,
  minutes : 0
}

localStorage.setItem("user", user_info);
localStorage.setItem("timer", timer_data);

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
  const timeInMs =((timer_data.hours * 60 * 60) + (timer_data.minutes * 60)) * 1000;
  const twentyPercentRemaining = Math.floor(timeInMs * 0.8);
  
  timerId = setTimeout(() => {
    // Close the Amazon tab
    chrome.tabs.query({ url: '*://*.amazon.com/*' }, (tabs) => {
      alert(`Stop Shopping! You've reached your time limit of ${timer_data.hours} hours and ${timer_data.minutes} minutes.`);
      tabs.forEach(tab => {
        chrome.tabs.remove(tab.id);
      });
    });
  }, timeInMs);

  setTimeout(() => {
    const remainingTime = twentyPercentRemaining / 1000; // convert to seconds
    if (remainingTime < 60) {
      alert(`Attention! You have 20% of your time remaining (${timeInMs - twentyPercentRemaining} seconds).`);
    } else {
      const remainingHours = Math.floor(remainingTime / 3600);
      const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
      alert(`Attention! You have 20% of your time remaining (${remainingHours} hours and ${remainingMinutes} minutes).`);
    }
  }, twentyPercentRemaining);
}


document.addEventListener('DOMContentLoaded', () => {
  showTimeLimitContainer();
  document.querySelector('.user_form').addEventListener('submit', (e) =>{
    user_info.username = document.getElementById('name').value;
    user_info.email = document.getElementById('email').value;
    user_info.phone = document.getElementById('phone').value;
    e.preventDefault()
  })
  document.querySelector('.timer_form').addEventListener('submit', (e) =>{
    timer_data.hours = parseInt(document.getElementById('hours').value);
    hours = timer_data.hours;
    timer_data.minutes = parseInt(document.getElementById('minutes').value);
    minutes = timer_data.minutes;
    e.preventDefault();
  })

  document.getElementById('start-timer').addEventListener('click', () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    startTimer();
  });
});


