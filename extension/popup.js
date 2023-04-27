let timerId;

function showTimeLimitContainer() {
  const setTimeLimitButton = document.getElementById('set-time-limit');
  const setTimeLimitContainer = document.querySelector('.set-time-limit-container');

  setTimeLimitButton.addEventListener('click', () => {
    setTimeLimitButton.style.display = 'none';
    setTimeLimitContainer.style.display = 'block';
  });
}
//this doesnt work because iconUrl is deprecated and doesnt show up for mac
// function showNotification(hours, minutes) {
//   chrome.notifications.create({
//     type: 'basic',
//     iconUrl: '/Users/noahwilkens/Desktop/GitHub/StopShop/extension/images/slash.png',
//     title: 'Stop Shopping!',
//     message: `You've reached your time limit of ${hours} hours and ${minutes} minutes.`,
//     icons: {
//       128: '/Users/noahwilkens/Desktop/GitHub/StopShop/extension/images/slash.png',
//       64: '/Users/noahwilkens/Desktop/GitHub/StopShop/extension/images/slash.png',
//       32: '/Users/noahwilkens/Desktop/GitHub/StopShop/extension/images/slash.png',
//       16: '/Users/noahwilkens/Desktop/GitHub/StopShop/extension/images/slash.png',
//     },  
//   });
// }



function startTimer() {
  const hours = parseInt(document.getElementById('hours').value);
  const minutes = parseInt(document.getElementById('minutes').value);
  const timeInSeconds = (hours * 60 * 60) + (minutes * 60);

  timerId = setTimeout(() => {
    // Close the shopping tab
    chrome.tabs.query({ url: '*://*.amazon.com/*' }, (tabs) => {
      if (tabs && tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id);
        // showNotification(hours, minutes);
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
