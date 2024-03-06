let time = 0;
let intervalId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'START_TIMER') {
    intervalId = setInterval(() => {
      time++;
      chrome.storage.local.set({time: time});
    }, 1000);
  } else if (request.cmd === 'PAUSE_TIMER') {
    clearInterval(intervalId);
    chrome.storage.local.set({time: time});
  } else if (request.cmd === 'RESET_TIMER') {
    clearInterval(intervalId);
    time = 0;
    chrome.storage.local.set({time: time});
  }
});

chrome.storage.local.set({time: time});