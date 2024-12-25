<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DBD Tracker</title>
  <link rel="stylesheet" href="style.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #1a1a1a, #333333);
      color: #ffffff;
    }
    h1 {
      text-align: center;
      font-weight: 600;
      color: #ff4444;
    }
    h2 {
      text-align: center;
      color: #ffffff;
    }
    label, input, select, button {
      margin: 10px 0;
      color: #ffffff;
      background-color: #222222;
      border: 1px solid #ff4444;
      padding: 10px;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: #ff4444;
      color: #ffffff;
      box-shadow: 0 0 10px #ff4444;
    }
    pre {
      border: 1px solid #999999;
      padding: 10px;
      background-color: #222222;
      color: #ffffff;
      white-space: pre-wrap;
      border-radius: 5px;
      box-shadow: 0 0 15px rgba(169, 169, 169, 0.8);
      animation: smokeEffect 5s infinite alternate;
    }

    @keyframes smokeEffect {
      0% { box-shadow: 0 0 15px rgba(169, 169, 169, 0.6); }
      50% { box-shadow: 0 0 20px rgba(169, 169, 169, 0.9); }
      100% { box-shadow: 0 0 15px rgba(169, 169, 169, 0.6); }
    }

    .highlighted {
      background-color: #b8860b;
      color: #ffffff;
      padding: 5px;
      border-radius: 5px;
    }

    .notification {
      text-align: center;
      margin: 10px 0;
      color: #00ff00;
    }

    .tooltip {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 200px;
      background-color: #222;
      color: #fff;
      text-align: center;
      padding: 5px;
      border-radius: 5px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -100px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    button {
      transition: transform 0.2s;
    }

    button:active {
      transform: scale(0.95);
    }

  </style>
</head>
<body>
  <h1>DBD Tracker</h1>
  <p style="text-align: center; font-size: 14px;">A simple Website to keep Track of your DBD Challenges/Streaks. No login necessary. Stats saved in your Browser's Local Storage<br>
  For feedback or ideas add "sleepingalot" on Discord or Steam!</p>

  <div id="notification" class="notification"></div>

  <!-- Dropdown for Challenges / Streaks -->
  <label for="challengeSelect" class="tooltip">Select a Challenge / Streak:
    <span class="tooltiptext">Choose a challenge to track progress</span>
  </label>
  <select id="challengeSelect" onchange="highlightSelectedChallenge()"></select>

  <!-- Enter Progress -->
  <label for="progressInput" class="tooltip">Progress:
    <span class="tooltiptext">Enter your current progress for the selected challenge</span>
  </label>
  <input id="progressInput" type="number" min="1" max="9999" />
  <button onclick="delayedAction(updateProgress)" class="tooltip">Save
    <span class="tooltiptext">Save progress for the selected challenge</span>
  </button>
  <button onclick="delayedAction(deleteChallenge)" class="tooltip">Delete Challenge / Streak
    <span class="tooltiptext">Remove the selected challenge</span>
  </button>

  <!-- Add New Challenge / Streak -->
  <h2>Add New Challenge / Streak</h2>
  <label for="newChallenge" class="tooltip">Name:
    <span class="tooltiptext">Enter a name for your new challenge</span>
  </label>
  <input id="newChallenge" type="text" />
  <button onclick="delayedAction(addChallenge)" class="tooltip">Add
    <span class="tooltiptext">Add a new challenge</span>
  </button>

  <!-- Sorted Challenge / Streak List -->
  <h2>Challenge / Streak List</h2>
  <button onclick="delayedAction(sortByName)" class="tooltip">Sort by Name
    <span class="tooltiptext">Sort the list alphabetically</span>
  </button>
  <button onclick="delayedAction(sortByProgress)" class="tooltip">Sort by Progress
    <span class="tooltiptext">Sort the list by progress values</span>
  </button>
  <button onclick="delayedAction(sortByRecent)" class="tooltip">Sort by Recent
    <span class="tooltiptext">Sort the list by last modified</span>
  </button>
  <pre id="challengeList"></pre>
  <button onclick="delayedAction(resetPersonalBest)" class="tooltip">Reset all Best Values
    <span class="tooltiptext">Reset all best values to 0</span>
  </button>

  <h2 style="text-align: center; margin-top: 20px;">Made by sleepingalot</h2>
  <p style="text-align: center; font-size: 12px; margin-top: 50px;">Note: Data may be lost when clearing cache or browser history. Using private/incognito mode or switching browsers may not retain data. It is recommended to regularly export your data—just to be safe!</p>

  <script src="script.js"></script>
</body>
</html>
