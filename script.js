let currentMode = 'emmet';
let challenge = '';
let startTime = null;
let timer = null;
let completed = false;

const emmetSamples = [
  "ul>li*3", "form>input+button", "div>h1+p", "nav>ul>li*4>a"
];

const htmlSamples = [
  "<ul><li>Item 1</li><li>Item 2</li></ul>",
  "<form><input type='text'><button>Go</button></form>",
  "<div><h1>Title</h1><p>Desc</p></div>"
];

const challengeBox = document.getElementById('challengeBox');
const typingArea = document.getElementById('typingArea');
const wpmDisplay = document.getElementById('wpm');
const accDisplay = document.getElementById('accuracy');

document.getElementById('modeEmmet').addEventListener('click', () => switchMode('emmet'));
document.getElementById('modeHtml').addEventListener('click', () => switchMode('html'));
document.getElementById('darkToggle').addEventListener('click', () => document.body.classList.toggle('light'));

function switchMode(mode) {
  currentMode = mode;
  reset();
  newChallenge();
}

function newChallenge() {
  const pool = currentMode === 'emmet' ? emmetSamples : htmlSamples;
  challenge = pool[Math.floor(Math.random() * pool.length)];
  challengeBox.textContent = challenge;
  typingArea.value = '';
  typingArea.disabled = false;
  completed = false;
}

function reset() {
  wpmDisplay.textContent = '0';
  accDisplay.textContent = '0';
  clearInterval(timer);
  startTime = null;
}

typingArea.addEventListener('input', () => {
  if (completed) return;

  const input = typingArea.value;
  if (!startTime) {
    startTime = Date.now();
    timer = setInterval(updateStats, 300);
  }

  if (input === challenge) {
    completed = true;
    clearInterval(timer);
    updateStats();
    setTimeout(() => {
      reset();
      newChallenge();
    }, 1500);
  }
});

function updateStats() {
  const typed = typingArea.value;
  const elapsed = (Date.now() - startTime) / 1000;
  const correct = [...typed].filter((ch, i) => ch === challenge[i]).length;
  const acc = Math.round((correct / typed.length) * 100) || 0;
  const wpm = Math.round((correct / 5) / (elapsed / 60)) || 0;

  wpmDisplay.textContent = wpm;
  accDisplay.textContent = acc;
}

switchMode('emmet');

