let timerId;

function showTimeLimitContainer() {
  const setTimeLimitButton = document.getElementById('set-time-limit');
  const setTimeLimitContainer = document.querySelector('.set-time-limit-container');

  setTimeLimitButton.addEventListener('click', () => {
    setTimeLimitButton.style.display = 'none';
    setTimeLimitContainer.style.display = 'block';
  });
}
function startTimer() {
  const hours = parseInt(document.getElementById('hours').value);
  const minutes = parseInt(document.getElementById('minutes').value);
  const timeInSeconds = (hours * 60 * 60) + (minutes * 60);

  timerId = setTimeout(() => {
    // Close the Amazon tab
    chrome.tabs.query({ url: 'https://www.amazon.com/*' }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id);
        alert(`Stop Shopping! You've reached your time limit of ${hours} hours and ${minutes} minutes.`);
      }
    });
  }, timeInSeconds * 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  showTimeLimitContainer();

document.getElementById('start-timer').addEventListener('click', () => {
  if (timerId) {
    clearTimeout(timerId);
  }
  startTimer();
});
});