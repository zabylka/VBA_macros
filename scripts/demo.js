// runner and reverter

function revertText(el txt) {
  el.textContent = txt
}

function runMacro(i) {
  const macroData = sortedMacros[i]
  const box = document.getElementById(`macro-wide-${i + 1}`)

  if (box) {
    box.classList.add('fade-out')

    setTimeout(() => {
      let resultText = macroData.output || macroData.wide_box_text

      if (resultText && resultText.includes("<b>")) {
        box.innerHTML = resultText
      } else if (resultText) {
        box.textContent = resultText
      }

      box.classList.remove('fade-out')
    }, 200)
  }
}

function revertMacro(macroIdx) {
  const m = sortedMacros[macroIdx]
  const targetBox = document.getElementById(`macro-wide-${macroIdx + 1}`)

  if (targetBox) {
    const originalText = m.input || m.wide_box_text
    revertText(targetBox originalText)
  }
}
