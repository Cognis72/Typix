const emmetInput = document.getElementById('emmetInput');
    const preview = document.getElementById('preview');
    const accuracyDisplay = document.getElementById('accuracy');
    const wpmDisplay = document.getElementById('wpm');
    const timeDisplay = document.getElementById('time');
    const targetCodeDisplay = document.getElementById('targetCode');

    const emmetChallenges = [
      "ul>li*3",
      "div>h1+p",
      "section>article+aside",
      "nav>ul>li*4>a"
    ];
    let currentChallenge = "";
    let startTime = null;
    let timerInterval = null;

    function simpleEmmetExpand(input) {
      if (input === 'ul>li*3') {
        return `<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>`;
      }
      if (input === 'div>h1+p') {
        return `<div><h1>Title</h1><p>Paragraph</p></div>`;
      }
      if (input === 'section>article+aside') {
        return `<section><article>Article</article><aside>Aside</aside></section>`;
      }
      if (input === 'nav>ul>li*4>a') {
        return `<nav><ul><li><a href="#">Link 1</a></li><li><a href="#">Link 2</a></li><li><a href="#">Link 3</a></li><li><a href="#">Link 4</a></li></ul></nav>`;
      }
      return `<p style="color:red;">No template matched.</p>`;
    }

    function calculateAccuracy(user, target) {
      const len = user.length;
      let correct = 0;
      for (let i = 0; i < len; i++) {
        if (user[i] === target[i]) correct++;
      }
      return len > 0 ? Math.round((correct / len) * 100) : 0;
    }

    function calculateWPM(chars, seconds) {
      const words = chars / 5;
      const mins = seconds / 60;
      return mins > 0 ? Math.round(words / mins) : 0;
    }

    function getNewChallenge() {
      const random = emmetChallenges[Math.floor(Math.random() * emmetChallenges.length)];
      currentChallenge = random;
      targetCodeDisplay.textContent = currentChallenge;
      emmetInput.value = '';
      accuracyDisplay.textContent = '0';
      wpmDisplay.textContent = '0';
      timeDisplay.textContent = '0';
      startTime = null;
      clearInterval(timerInterval);
      preview.srcdoc = '';
    }

    emmetInput.addEventListener('input', () => {
      const value = emmetInput.value.trim();

      // Start timer
      if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          timeDisplay.textContent = elapsed;
          wpmDisplay.textContent = calculateWPM(value.length, elapsed);
        }, 1000);
      }

      // Real-time accuracy
      const acc = calculateAccuracy(value, currentChallenge);
      accuracyDisplay.textContent = acc;

      // Check if completed
      if (value === currentChallenge) {
        preview.srcdoc = simpleEmmetExpand(value);
        setTimeout(() => getNewChallenge(), 1000);
      }
    });

    // Init first challenge
    getNewChallenge();
