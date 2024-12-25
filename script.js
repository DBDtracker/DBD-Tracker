const defaultChallenges = ['Survivor Escape Streak', 'Killer Win Streak', 'Copy Cat Challenge', 'Random Perk Streak', 'Random Killer Streak'];
let challenges = JSON.parse(localStorage.getItem('challenges')) || [...defaultChallenges];
let progress = JSON.parse(localStorage.getItem('progress')) || {};
let personalBest = JSON.parse(localStorage.getItem('personalBest')) || {};
let timestamps = JSON.parse(localStorage.getItem('timestamps')) || {};

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  setTimeout(() => notification.textContent = '', 3000);
}

function delayedAction(action) {
  setTimeout(action, 500);
}

function updateDropdown() {
  const challengeSelect = document.getElementById('challengeSelect');
  challengeSelect.innerHTML = '';
  challenges.forEach(challenge => {
    const option = document.createElement('option');
    option.value = challenge;
    option.textContent = challenge;
    challengeSelect.appendChild(option);
  });
}

function updateChallengeList() {
  const challengeList = document.getElementById('challengeList');
  const list = challenges.map(challenge => `${challenge}: ${progress[challenge] || 0} (Best: ${personalBest[challenge] || 0})`);
  challengeList.innerHTML = list.join('<br>');
}

function addChallenge() {
  const newChallenge = document.getElementById('newChallenge').value.trim();
  if (newChallenge && !challenges.includes(newChallenge)) {
    challenges.push(newChallenge);
    progress[newChallenge] = 0;
    personalBest[newChallenge] = 0;
    updateDropdown();
    updateChallengeList();
    showNotification('Challenge added!');
  }
}

updateDropdown();
updateChallengeList();
