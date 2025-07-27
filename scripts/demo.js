function revertText(element, text) {
  element.textContent = text;
}

// ====== generic macro text animation ======

function runMacro(index) {
  const macro = sortedMacros[index];
  const wideBox = document.getElementById(`macro-wide-${index + 1}`);
  if (wideBox) {
    wideBox.classList.add('fade-out');
    setTimeout(() => {
      let newText = macro.output || macro.wide_box_text;
      if (newText && newText.includes("<b>")) {
        wideBox.innerHTML = newText;
      } else if (newText) {
        wideBox.textContent = newText;
      }
      wideBox.classList.remove('fade-out');
    }, 200);
  }
}

function revertMacro(index) {
  const macro = sortedMacros[index];
  const wideBox = document.getElementById(`macro-wide-${index + 1}`);
  if (wideBox) {
    revertText(wideBox, macro.input || macro.wide_box_text);
  }
}
