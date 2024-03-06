function updateTime(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);
    document.getElementById('timer').textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({cmd: 'START_TIMER'});
    document.getElementById('startSound').play();
  });
  
  document.getElementById('pause').addEventListener('click', () => {
    chrome.runtime.sendMessage({cmd: 'PAUSE_TIMER'});
    document.getElementById('pauseSound').play();
  });
  
  document.getElementById('reset').addEventListener('click', () => {
    chrome.runtime.sendMessage({cmd: 'RESET_TIMER'});
    document.getElementById('resetSound').play();
  });
  
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && 'time' in changes) {
      updateTime(changes.time.newValue);
    }
  });
  
  chrome.storage.local.get(['time'], result => {
    updateTime(result.time);
  });