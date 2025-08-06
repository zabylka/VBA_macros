// runner and reverter
function revertText(el, txt) {
  el.textContent = txt
}

function runMacro(i) {
  const m = sortedMacros[i]
  const box = document.getElementById(`macro-wide-${i + 1}`)

  if (box) {
    box.classList.add('fade-out')

    setTimeout(() => {
      let newTxt = m.output || m.wide_box_text

      if (newTxt && newTxt.includes("<b>")) {
        box.innerHTML = newTxt
      } else if (newTxt) {
        box.textContent = newTxt
      }

      box.classList.remove('fade-out')
    }, 200)
  }
}

function revertMacro(i) {
  const m = sortedMacros[i]
  const box = document.getElementById(`macro-wide-${i + 1}`)

  if (box) {
    const originalTxt = m.input || m.wide_box_text
revertText(box, originalTxt)
  }
}
