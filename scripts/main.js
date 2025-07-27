document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('h1');
  if (header) {
    const text = header.textContent;
    const letters = text.split('');
    header.innerHTML = '';
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.dataset.index = index; 
      if (letter === ' ') {
        span.classList.add('space');
      } else {
        const randomDuration = Math.random() * 2 + 2; // Slower: 2s to 4s
        const randomDelay = Math.random() * 3; // More delay
        span.style.animationDuration = `${randomDuration}s`;
        span.style.animationDelay = `${randomDelay}s`;
      }
      header.appendChild(span);
    });

    const video = document.getElementById('video-background');
    video.volume = 0.25;
    let clickCount = 0;

    video.addEventListener('ended', () => {
      video.classList.add('fade-out');
      clickCount = 1; // Reset for next play
    });

    header.addEventListener('click', () => {
      clickCount++;

      if (clickCount === 1) {
        const allSpans = header.querySelectorAll('span');
        const ySpans = Array.from(allSpans).filter(s => s.textContent.toUpperCase() === 'Y');
        const lastY = ySpans[ySpans.length - 1];

        allSpans.forEach(span => {
          if (span === lastY) {
            span.classList.add('fallen');
          } else {
            span.classList.add('frozen');
          }
        });
      } else if (clickCount === 2) {
        video.classList.remove('fade-out');
        video.classList.add('visible');
        video.play();
      } else if (clickCount === 3) {
        video.classList.add('fade-out');
        setTimeout(() => {
          video.pause();
        }, 1000); // Corresponds to the animation duration
        clickCount = 1; // Reset for next play
      }
    });
  }

});

let sortedMacros;
document.addEventListener('macrosLoaded', () => {
  const macroContainer = document.getElementById('macro-container');

  const pinnedMacros = macros.filter(m => m.pinned);
  const otherMacros = macros.filter(m => !m.pinned);
  pinnedMacros.sort((a, b) => a.title.localeCompare(b.title));
  otherMacros.sort((a, b) => a.title.localeCompare(b.title));
  sortedMacros = [...pinnedMacros, ...otherMacros];

  sortedMacros.forEach((macro, index) => {
    const card = document.createElement('div');
    card.className = 'macro-card';
    if (macro.pinned) {
      card.classList.add('essential-card');
    }
    card.dataset.tags = macro.tags.join(' ');

    const mainContent = document.createElement('div');
    mainContent.className = 'card-main-content';

    const title = document.createElement('h2');
    title.textContent = macro.title;

    if (macro.hotkey) {
      const hotkeySpan = document.createElement('span');
      hotkeySpan.className = 'hotkey-recommendation';
      hotkeySpan.textContent = macro.hotkey;
      title.appendChild(hotkeySpan);
    }
    
    mainContent.appendChild(title);

    if (macro.description) {
      const description = document.createElement('p');
      description.className = 'description';
      description.textContent = macro.description;
      mainContent.appendChild(description);
    }
    
    if (macro.input) {
      const demoRow = document.createElement('div');
      demoRow.className = 'demo-row';

    const inputBox = document.createElement('div');
    inputBox.className = 'demo-box input-box';
    inputBox.id = `macro-input-${index + 1}`;
    inputBox.textContent = macro.input;
    demoRow.appendChild(inputBox);

    const outputBox = document.createElement('div');
    outputBox.className = 'demo-box output-box';
    outputBox.id = `macro-output-${index + 1}`;
    outputBox.innerHTML = macro.output;
    demoRow.appendChild(outputBox);

    mainContent.appendChild(demoRow);
    }

    if (macro.input || macro.wide_box_text) {
      const wideBox = document.createElement('div');
      wideBox.className = 'demo-box wide-box';
      wideBox.id = `macro-wide-${index + 1}`;
      if (macro.input) {
        wideBox.textContent = macro.input;
      } else if (macro.wide_box_text) {
        wideBox.textContent = macro.wide_box_text;
      }
      mainContent.appendChild(wideBox);
    }

    card.appendChild(mainContent);

    const actionsRow = document.createElement('div');
    actionsRow.className = 'macro-actions-row';

    const buttonsDiv = document.createElement('div');
    if (macro.input || macro.wide_box_text) {
      const runButton = document.createElement('button');
      runButton.id = `run-btn-${index + 1}`;
      runButton.className = 'btn-outline';
      runButton.textContent = '➜ Run';
      runButton.setAttribute('onclick', `runMacro(${index})`);
      buttonsDiv.appendChild(runButton);

      const revertButton = document.createElement('button');
      revertButton.id = `revert-btn-${index + 1}`;
      revertButton.className = 'btn-outline';
      revertButton.textContent = '↩';
      revertButton.setAttribute('onclick', `revertMacro(${index})`);
      buttonsDiv.appendChild(revertButton);
    }

    const showCodeButton = document.createElement('button');
    showCodeButton.className = 'btn-outline';
    showCodeButton.textContent = 'Show Code';
    showCodeButton.setAttribute('onclick', `showCodeModal(this)`);
    buttonsDiv.appendChild(showCodeButton);

    const copyButton = document.createElement('button');
    copyButton.className = 'btn-outline';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('onclick', `copyCode(this)`);
    buttonsDiv.appendChild(copyButton);

    actionsRow.appendChild(buttonsDiv);

    

    const codeContainer = document.createElement('div');
    codeContainer.style.display = 'none';
    const codeEl = document.createElement('code');
    codeEl.textContent = macro.code.trim();
    codeContainer.appendChild(codeEl);
    card.appendChild(codeContainer);

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'macro-tags';
    tagsDiv.textContent = macro.tags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
    card.appendChild(tagsDiv);

    card.appendChild(actionsRow);

    macroContainer.appendChild(card);
  });

  document.querySelectorAll('.macro-card').forEach(c => c.classList.add('show'));
  document.dispatchEvent(new Event('macrosRendered'));
  
  adjustFontSizes();
});

function adjustFontSizes() {
  const titles = document.querySelectorAll('.macro-card h2');
  titles.forEach(title => {
    const card = title.closest('.macro-card');
    let fontSize = parseFloat(window.getComputedStyle(title, null).getPropertyValue('font-size'));
    while (title.scrollWidth > card.clientWidth - 20) { // 20px for padding
      fontSize -= 1;
      title.style.fontSize = `${fontSize}px`;
    }
  });
}

function showCodeModal(btn) {
  const card = btn.closest('.macro-card');
  if (!card) return;
  const code = card.querySelector('code').textContent;

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => document.body.removeChild(modalOverlay);

  const pre = document.createElement('pre');
  const codeEl = document.createElement('code');
  codeEl.textContent = code;
  pre.appendChild(codeEl);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(pre);
  modalOverlay.appendChild(modalContent);

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  };

  document.body.appendChild(modalOverlay);
}

function copyCode(btn) {
    const card = btn.closest('.macro-card');
    if (!card) return;
    const codeEl = card.querySelector('code');
    if (!codeEl) return;

    let text = codeEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
        }).catch(err => {
            console.error('Failed to copy with clipboard API: ', err);
            copyTextFallback(text, btn);
        });
    } else {
        copyTextFallback(text, btn);
    }
}

function copyTextFallback(text, btn) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // hide text area
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '-9999px';
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
    } else {
      console.error('Fallback: Unable to copy');
    }
  } catch (err) {
    console.error('Fallback: Error copying text', err);
  }

  document.body.removeChild(textArea);
}
