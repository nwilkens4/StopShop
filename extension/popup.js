let timerId;

function startTimer() {
  const timeLimit = parseInt(document.getElementById('time-limit').value);
  const timeInSeconds = timeLimit * 60;

  timerId = setTimeout(() => {
    // Close the Amazon tab
    chrome.tabs.query({ url: 'https://www.amazon.com/*' }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id);
        alert(`Time's up! You've reached your time limit of ${timeLimit} minutes.`);
      }
    });
  }, timeInSeconds * 1000);
}

document.getElementById('start-timer').addEventListener('click', () => {
  if (timerId) {
    clearTimeout(timerId);
  }
  startTimer();
});