// Array Of Words
const words = [
  "Hello",
  "Programming",
  "code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 6,
  Medium: 4,
  Hard: 2,
};

// Default Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.getElementById("start"),
  lvlNameSpan = document.getElementById("lvl"),
  secondsSpan = document.getElementById("seconds"),
  theWord = document.getElementById("the-word"),
  upcomingWords = document.querySelector(".upcoming-words"),
  input = document.getElementById("input"),
  timeLeftSpan = document.querySelector(".time span"),
  scoreGot = document.getElementById("got"),
  scoreTotal = document.getElementById("total"),
  finishMessage = document.getElementById("finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = () => false;

// Start Game
startButton.addEventListener("click", function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
});

// Word Function
function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)],
    wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  words.length === 29
    ? (timeLeftSpan.innerHTML = parseInt(defaultLevelSeconds) + 3)
    : (timeLeftSpan.innerHTML = defaultLevelSeconds);
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML === input.value) {
        RightWord();
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over!");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        // Remove Upcoming Word
        upcomingWords.remove();
        // Remove the Word
        theWord.remove();
        // Disable Input
        input.setAttribute("disabled", true);
      }
    }
  }, 1000);
  // Check on Input
  input.oninput = () => {
    if (theWord.innerHTML === input.value) {
      clearInterval(start);
      RightWord();
    }
  };
}

function RightWord() {
  input.value = "";
  scoreGot.innerHTML++;
  if (words.length > 0) {
    genWords();
  } else {
    let span = document.createElement("span");
    span.className = "good";
    let spanText = document.createTextNode("Perfect!");
    span.appendChild(spanText);
    finishMessage.appendChild(span);
    // Remove Upcoming Word
    upcomingWords.remove();
    // Remove the Word
    theWord.remove();
    // Disable input
    input.setAttribute("disabled", true);
  }
}
