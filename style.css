const defaultChallenges = ['Survivor Escape Streak', 'Killer Win Streak', 'Copy Cat Challenge', 'Random Perk Streak', 'Random Killer Streak'];
let challenges = JSON.parse(localStorage.getItem('challenges')) || defaultChallenges;
let progress = JSON.parse(localStorage.getItem('progress')) || {};
let personalBest = JSON.parse(localStorage.getItem('personalBest')) || {};
let timestamps = JSON.parse(localStorage.getItem('timestamps')) || {};

function addChallenge() {
  const newChallenge = document.getElementById('newChallenge').value.trim();
  if (newChallenge && !challenges.includes(newChallenge)) {
    challenges.push(newChallenge);
    localStorage.setItem('challenges', JSON.stringify(challenges));
    updateDropdown();
    updateChallengeList();
    showNotification('Challenge added successfully!');
  }
}

function deleteChallenge() {
  const challenge = document.getElementById('challengeSelect').value;
  challenges = challenges.filter(c => c !== challenge);
  delete progress[challenge];
  delete personalBest[challenge];
  delete timestamps[challenge];
  localStorage.setItem('challenges', JSON.stringify(challenges));
  updateDropdown();
  updateChallengeList();
  showNotification('Challenge deleted successfully!');
}

function sortByName() {
  challenges.sort();
  updateChallengeList();
}
