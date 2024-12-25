const defaultChallenges = [
  'Survivor Escape Streak',
  'Killer Win Streak',
  'Copy Cat Challenge',
  'Random Perk Streak',
  'Random Killer Streak'
];

let challenges = JSON.parse(localStorage.getItem('challenges')) || [...defaultChallenges];
let progress = JSON.parse(localStorage.getItem('progress')) || {};
let personalBest = JSON.parse(localStorage.getItem('personalBest')) || {};
let timestamps = JSON.parse(localStorage.getItem('timestamps')) || {};

// Benachrichtigung anzeigen
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  setTimeout(() => notification.textContent = '', 3000);
}

// Verzögerte Aktionen für Feedback
function delayedAction(action) {
  setTimeout(action, 500);
}

// Dropdown aktualisieren
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

// Liste aktualisieren
function updateChallengeList() {
  const challengeList = document.getElementById('challengeList');
  const selectedChallenge = document.getElementById('challengeSelect').value;
  const list = challenges.map(challenge => {
    const progressValue = progress[challenge] || 0;
    const bestValue = personalBest[challenge] || 0;
    const displayText = `${challenge}: ${progressValue}${bestValue > 0 ? ` (Best: ${bestValue})` : ''}`;
    return challenge === selectedChallenge ? `<span class='highlighted'>${displayText}</span>` : displayText;
  });
  challengeList.innerHTML = list.join('<br>');
}

// Neue Challenge hinzufügen
function addChallenge() {
  const newChallenge = document.getElementById('newChallenge').value.trim();
  if (newChallenge && !challenges.includes(newChallenge)) {
    challenges.push(newChallenge);
    progress[newChallenge] = 0;
    personalBest[newChallenge] = 0;
    timestamps[newChallenge] = Date.now();
    saveToLocalStorage();
    updateDropdown();
    updateChallengeList();
    showNotification('Challenge added successfully!');
  } else {
    showNotification('Challenge already exists or is invalid!');
  }
}

// Fortschritt aktualisieren
function updateProgress() {
  const challenge = document.getElementById('challengeSelect').value;
  const value = parseInt(document.getElementById('progressInput').value, 10);
  if (value >= 1 && value <= 9999) {
    progress[challenge] = value;
    personalBest[challenge] = Math.max(personalBest[challenge] || 0, value);
    timestamps[challenge] = Date.now();
    saveToLocalStorage();
    updateChallengeList();
    showNotification('Progress updated successfully!');
  } else {
    showNotification('Invalid progress value!');
  }
}

// Challenge löschen
function deleteChallenge() {
  const challenge = document.getElementById('challengeSelect').value;
  challenges = challenges.filter(c => c !== challenge);
  delete progress[challenge];
  delete personalBest[challenge];
  delete timestamps[challenge];
  if (challenges.length === 0) challenges = [...defaultChallenges]; // Standard-Challenges wiederherstellen
  saveToLocalStorage();
  updateDropdown();
  updateChallengeList();
  showNotification('Challenge deleted successfully!');
}

// Nach Namen sortieren
function sortByName() {
  challenges.sort();
  updateChallengeList();
}

// Nach Fortschritt sortieren
function sortByProgress() {
  challenges.sort((a, b) => (progress[b] || 0) - (progress[a] || 0));
  updateChallengeList();
}

// Nach zuletzt geändert sortieren
function sortByRecent() {
  challenges.sort((a, b) => (timestamps[b] || 0) - (timestamps[a] || 0));
  updateChallengeList();
}

// Alle Bestwerte zurücksetzen
function resetPersonalBest() {
  Object.keys(personalBest).forEach(key => personalBest[key] = 0);
  saveToLocalStorage();
  updateChallengeList();
  showNotification('All Best Values reset!');
}

// Lokale Speicherung aktualisieren
function saveToLocalStorage() {
  localStorage.setItem('challenges', JSON.stringify(challenges));
  localStorage.setItem('progress', JSON.stringify(progress));
  localStorage.setItem('personalBest', JSON.stringify(personalBest));
  localStorage.setItem('timestamps', JSON.stringify(timestamps));
}

// Dropdown und Liste initialisieren
updateDropdown();
updateChallengeList();
