// Typix Sci-Fi Trainer - script.js
let currentMode = 'emmet';
let challenge = '';
let startTime = null;
let timer = null;
let completed = false;

const challengeBox = document.getElementById('challengeBox');
const typingArea = document.getElementById('typingArea');
const wpmDisplay = document.getElementById('wpm');
const accDisplay = document.getElementById('accuracy');
const keyboardOverlay = document.getElementById('keyboardOverlay');

const modeButtons = {
  emmet: document.getElementById('modeEmmet'),
  html: document.getElementById('modeHtml'),
  css: document.getElementById('modeCss')
};

document.getElementById('darkToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

Object.entries(modeButtons).forEach(([mode, button]) => {
  button.addEventListener('click', () => switchMode(mode));
});

function switchMode(mode) {
  currentMode = mode;
  highlightModeButton(mode);
  reset();
  newChallenge();
  typingArea.focus();
}

function highlightModeButton(mode) {
  Object.entries(modeButtons).forEach(([key, button]) => {
    button.style.background = key === mode ? '#00ffe055' : 'transparent';
  });
}

function reset() {
  wpmDisplay.textContent = '0';
  accDisplay.textContent = '0';
  clearInterval(timer);
  startTime = null;
  completed = false;
  updateKeyboardOverlay();
}

function getCurrentPool() {
  switch (currentMode) {
    case 'html': return htmlSamples;
    case 'css': return cssSamples;
    default: return emmetSamples;
  }
}

function newChallenge() {
  const pool = getCurrentPool();
  challenge = pool[Math.floor(Math.random() * pool.length)];
  challengeBox.textContent = challenge;
  typingArea.value = '';
  typingArea.disabled = false;
  updateKeyboardOverlay();
}

const keyRows = [
  ['1','2','3','4','5','6','7','8','9','0','+'],
  ['q','w','e','r','t','y','u','i','o','p','{','}'],
  ['a','s','d','f','g','h','j','k','l',';',],
  ['z','x','c','v','b','n','m',',','.','/'],
  [' ']
];

function updateKeyboardOverlay() {
  keyboardOverlay.innerHTML = '';
  keyRows.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('key-row');
    row.forEach(char => {
      const key = document.createElement('div');
      key.classList.add('key');
      key.dataset.key = char === ' ' ? 'space' : char;
      key.textContent = char === ' ' ? '[space]' : char;
      rowDiv.appendChild(key);
    });
    keyboardOverlay.appendChild(rowDiv);
  });
}

function activateCurrentKeyHighlight(currentChar) {
  const normalized = currentChar === ' ' ? 'space' : currentChar?.toLowerCase();
  document.querySelectorAll('.key').forEach(key => {
    key.classList.toggle('active', key.dataset.key === normalized);
  });
}

typingArea.addEventListener('input', () => {
  if (completed) return;

  const input = typingArea.value;
  const nextChar = challenge[input.length] || '';
  activateCurrentKeyHighlight(nextChar);

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
  `<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>`,
  `<form><input type="text" /><button>Submit</button></form>`,
  `<div><h1>Main Title</h1><p>This is a paragraph.</p></div>`,
  `<input type="checkbox" id="check1" /><label for="check1">Check me</label>`,
  `<picture><source srcset="image.webp" type="image/webp"><img src="image.jpg" alt="Example"></picture>`,
  `<canvas id="myCanvas"></canvas><script>/* your script here */</script>`,
  `<dl><dt>Term</dt><dd>Definition</dd><dd>Another definition</dd></dl>`,
  `<video controls><source src="movie.mp4" type="video/mp4">Your browser does not support video.</video>`,
  `<span>This is inline text.</span>`,
  `<section><h2>Section Title</h2><p>Some section content here.</p></section>`,
  `<table><tr><td>Row 1</td><td>Data</td></tr><tr><td>Row 2</td><td>More Data</td></tr></table>`,
  `<p>This is a paragraph tag.</p>`,
  `<footer><p>Copyright 2025</p><a href="#">Contact</a></footer>`,
  `<header><h1>Welcome</h1><nav><a href="#">Home</a></nav></header>`,
  `<button>Click</button><span>Icon</span>`,
  `<blockquote>Quote goes here.</blockquote><p>— Author</p>`,
  `<label for="email">Email</label><input type="email" id="email">`,
  `<figure><img src="cat.jpg" alt="A cat"><figcaption>Cute cat</figcaption></figure>`,
  `<div>This is a div.</div>`,
  `<svg><circle cx="50" cy="50" r="40" /><rect x="10" y="10" width="30" height="30" /></svg>`,
  `<select><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>`,
  `<aside><h3>Sidebar</h3><ul><li>Item 1</li><li>Item 2</li></ul></aside>`,
  `<form><label for="name">Name</label><input id="name" /><button>Submit</button></form>`,
  `<form><input type="text" /><input type="submit" value="Send" /></form>`,
  `<article><h2>News</h2><p>Today's news summary...</p></article>`,
  `<ol><li>First</li><li>Second</li><li>Third</li></ol>`,
  `<audio controls><source src="audio.mp3" type="audio/mpeg">Your browser does not support audio.</audio>`,
  `<main><section><p>First</p></section><section><p>Second</p></section></main>`,
  `<table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>`,
  `<blockquote>“Innovation distinguishes between a leader and a follower.”</blockquote>`,
  `<nav><ul><li><a href="#">Link 1</a></li><li><a href="#">Link 2</a></li></ul></nav>`,
  `<div><strong>Bold</strong> and <em>italic</em> text.</div>`,
  `<section><header><h2>Blog</h2></header><p>Welcome to the blog.</p></section>`,
  `<form action="#"><fieldset><legend>Info</legend><input type="text" /></fieldset></form>`,
  `<label for="age">Age:</label><input type="number" id="age">`,
  `<div style="color:red;">Inline styled div</div>`,
  `<figure><img src="example.png" /><figcaption>Example image</figcaption></figure>`,
  `<textarea placeholder="Type here..."></textarea>`,
  `<progress value="70" max="100"></progress>`,
  `<details><summary>More info</summary><p>This is extra content.</p></details>`,
  `<mark>Highlighted</mark> text.`,
  `<abbr title="HyperText Markup Language">HTML</abbr>`,
  `<hr /><p>New section</p>`,
  `<table><caption>Stats</caption><tr><th>Item</th><th>Value</th></tr><tr><td>Apples</td><td>10</td></tr></table>`,
  `<meter value="0.6">60%</meter>`,
  `<code>console.log('Hello');</code>`,
  `<kbd>Ctrl + S</kbd> to save.`,
  `<samp>Error: File not found</samp>`,
  `<output name="result">42</output>`,
  `<link rel="stylesheet" href="style.css">`,
  `<script src="main.js"></script>`
];
const cssSamples = [
  "color: red;", "background-color: #000;", "font-size: 16px;", "margin: 10px;",
  "padding: 20px;", "border: 1px solid #ccc;", "display: flex;", "justify-content: center;",
  "align-items: center;", "flex-direction: column;", "position: absolute;", "top: 0;",
  "left: 0;", "right: 0;", "bottom: 0;", "width: 100%;", "height: 100%;", "z-index: 10;",
  "overflow: hidden;", "text-align: center;", "font-weight: bold;", "font-style: italic;",
  "line-height: 1.5;", "text-decoration: underline;", "box-shadow: 0 0 10px #000;",
  "border-radius: 8px;", "opacity: 0.8;", "transition: all 0.3s ease;", "cursor: pointer;",
  "visibility: hidden;", "visibility: visible;", "white-space: nowrap;", "word-wrap: break-word;",
  "background-image: url('img.jpg');", "background-size: cover;", "background-repeat: no-repeat;",
  "background-position: center;", "border-top: 2px solid #f00;", "border-bottom: 2px dashed #0f0;",
  "transform: rotate(45deg);", "transform: scale(1.2);", "animation: fadeIn 1s ease;",
  "animation-delay: 0.5s;", "animation-iteration-count: infinite;", "grid-template-columns: 1fr 1fr;",
  "grid-gap: 10px;", "outline: none;", "caret-color: blue;", "list-style-type: none;",
  "overflow-y: scroll;", "overflow-x: hidden;", "object-fit: cover;", "filter: blur(4px);",
  "backdrop-filter: brightness(0.5);", "pointer-events: none;", "user-select: none;",
  "content: '';","clip-path: circle(50%);", "scroll-behavior: smooth;", "gap: 1rem;",
  "min-width: 200px;", "max-width: 800px;", "min-height: 300px;", "max-height: 100vh;",
  "border-left: 5px dotted red;", "border-right: 5px double blue;", "background-blend-mode: multiply;",
  "mix-blend-mode: screen;", "font-variant: small-caps;", "letter-spacing: 2px;",
  "word-spacing: 1em;", "text-transform: uppercase;", "writing-mode: vertical-rl;",
  "direction: rtl;", "float: right;", "clear: both;", "resize: both;", "column-count: 2;",
  "column-gap: 40px;", "box-sizing: border-box;", "will-change: transform;",
  "transition-delay: 0.2s;", "transition-duration: 0.4s;", "transition-property: opacity;",
  "transition-timing-function: ease-in-out;", "border-collapse: collapse;", "empty-cells: hide;",
  "caption-side: top;", "table-layout: fixed;", "quotes: '«' '»';", "page-break-before: always;",
  "orphans: 2;", "widows: 2;", "hyphens: auto;", "tab-size: 4;", "text-shadow: 2px 2px 5px #aaa;"
];

switchMode('emmet'); // Init
