
let currentMode = 'emmet';
let challenge = '';
let startTime = null;
let timer = null;
let completed = false;

const emmetSamples = [
  "ul>li*3",
  "form>input+button",
  "div>h1+p",
  "nav>ul>li*4>a",
  "input+label",
  "picture>source+img",
  "canvas+script",
  "dl>dt+dd*2",
  "video+source",
  "span",
  "section>h2+p",
  "table>tr*2>td*2",
  "p",
  "footer>p+a",
  "header>h1+nav",
  "button+span",
  "blockquote+p",
  "label+input",
  "figure>img+figcaption",
  "div",
  "svg>circle+rect",
  "select>option*3",
  "aside>h3+ul>li*2",
  "form>label+input+button",
  "form>input[type=text]+input[type=submit]",
  "article>h2+p",
  "ol>li*3",
  "audio+source",
  "main>section*2",
  "select>option*3",
  "form>label+input+button",
  "video+source",
  "input+label",
  "aside>h3+ul>li*2",
  "ol>li*3",
  "canvas+script",
  "form>label+input+button",
  "div",
  "span",
  "div",
  "canvas+script",
  "label+input",
  "dl>dt+dd*2",
  "video+source",
  "header>h1+nav",
  "article>h2+p",
  "svg>circle+rect",
  "div",
  "picture>source+img",
  "table>tr*2>td*2",
  "table>tr*2>td*2",
  "button+span",
  "picture>source+img",
  "aside>h3+ul>li*2",
  "table>tr*2>td*2",
  "label+input",
  "form>input[type=text]+input[type=submit]",
  "canvas+script",
  "section>h2+p",
  "ol>li*3",
  "audio+source",
  "footer>p+a",
  "form>input[type=text]+input[type=submit]",
  "label+input",
  "label+input",
  "audio+source",
  "button+span",
  "table>tr*2>td*2",
  "svg>circle+rect",
  "aside>h3+ul>li*2",
  "blockquote+p",
  "blockquote+p",
  "p",
  "form>label+input+button",
  "figure>img+figcaption",
  "blockquote+p",
  "ol>li*3",
  "audio+source",
  "input+label",
  "figure>img+figcaption",
  "footer>p+a",
  "svg>circle+rect",
  "div",
  "p",
  "div",
  "select>option*3",
  "dl>dt+dd*2",
  "footer>p+a",
  "input+label",
  "figure>img+figcaption",
  "footer>p+a"
];

const htmlSamples = [
  `<ul><li>Item 1</li><li>Item 2</li></ul>`,
  `<form><input type='text'><button>Go</button></form>`,
  `<div><h1>Title</h1><p>Desc</p></div>`,
  `<div>input+label</div>`,
  `<div>picture>source+img</div>`,
  `<div>canvas+script</div>`,
  `<div>dl>dt+dd*2</div>`,
  `<div>video+source</div>`,
  `<div>span</div>`,
  `<div>section>h2+p</div>`,
  `<div>table>tr*2>td*2</div>`,
  `<div>p</div>`,
  `<div>footer>p+a</div>`,
  `<div>header>h1+nav</div>`,
  `<div>button+span</div>`,
  `<div>blockquote+p</div>`,
  `<div>label+input</div>`,
  `<div>figure>img+figcaption</div>`,
  `<div>div</div>`,
  `<div>svg>circle+rect</div>`,
  `<div>select>option*3</div>`,
  `<div>aside>h3+ul>li*2</div>`,
  `<div>form>label+input+button</div>`,
  `<div>form>input[type=text]+input[type=submit]</div>`,
  `<div>article>h2+p</div>`,
  `<div>ol>li*3</div>`,
  `<div>audio+source</div>`,
  `<div>main>section*2</div>`,
  `<div>select>option*3</div>`,
  `<div>form>label+input+button</div>`,
  `<div>video+source</div>`,
  `<div>input+label</div>`,
  `<div>aside>h3+ul>li*2</div>`,
  `<div>ol>li*3</div>`,
  `<div>canvas+script</div>`,
  `<div>form>label+input+button</div>`,
  `<div>div</div>`,
  `<div>span</div>`,
  `<div>div</div>`,
  `<div>canvas+script</div>`,
  `<div>label+input</div>`,
  `<div>dl>dt+dd*2</div>`,
  `<div>video+source</div>`,
  `<div>header>h1+nav</div>`,
  `<div>article>h2+p</div>`,
  `<div>svg>circle+rect</div>`,
  `<div>div</div>`,
  `<div>picture>source+img</div>`,
  `<div>table>tr*2>td*2</div>`,
  `<div>table>tr*2>td*2</div>`,
  `<div>button+span</div>`,
  `<div>picture>source+img</div>`,
  `<div>aside>h3+ul>li*2</div>`,
  `<div>table>tr*2>td*2</div>`,
  `<div>label+input</div>`,
  `<div>form>input[type=text]+input[type=submit]</div>`,
  `<div>canvas+script</div>`,
  `<div>section>h2+p</div>`,
  `<div>ol>li*3</div>`,
  `<div>audio+source</div>`,
  `<div>footer>p+a</div>`,
  `<div>form>input[type=text]+input[type=submit]</div>`,
  `<div>label+input</div>`,
  `<div>label+input</div>`,
  `<div>audio+source</div>`,
  `<div>button+span</div>`,
  `<div>table>tr*2>td*2</div>`,
  `<div>svg>circle+rect</div>`,
  `<div>aside>h3+ul>li*2</div>`,
  `<div>blockquote+p</div>`,
  `<div>blockquote+p</div>`,
  `<div>p</div>`,
  `<div>form>label+input+button</div>`,
  `<div>figure>img+figcaption</div>`,
  `<div>blockquote+p</div>`,
  `<div>ol>li*3</div>`,
  `<div>audio+source</div>`,
  `<div>input+label</div>`,
  `<div>figure>img+figcaption</div>`,
  `<div>footer>p+a</div>`,
  `<div>svg>circle+rect</div>`,
  `<div>div</div>`,
  `<div>p</div>`,
  `<div>div</div>`,
  `<div>select>option*3</div>`,
  `<div>dl>dt+dd*2</div>`,
  `<div>footer>p+a</div>`,
  `<div>input+label</div>`,
  `<div>figure>img+figcaption</div>`,
  `<div>footer>p+a</div>`,
  `<div>span</div>`
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


