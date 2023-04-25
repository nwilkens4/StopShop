let timerId;

function startTimer() {
  const hours = parseInt(document.getElementById('hours').value);
  const minutes = parseInt(document.getElementById('minutes').value);
  const timeInSeconds = (hours * 60 * 60) + (minutes * 60);

  timerId = setTimeout(() => {
    // Close the Amazon tab
    chrome.tabs.query({ url: 'https://www.amazon.com/*' }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id);
        alert(`Time's up! You've reached your time limit of ${hours} hours and ${minutes} minutes.`);
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
