// 🌟 Animate header + build macro cards + wire up video + modals + copy stuff

document.addEventListener('DOMContentLoaded', () => {
  const titleEl = document.querySelector('h1')
  if (titleEl) {
    const txt = titleEl.textContent
    const chars = txt.split('')
    titleEl.innerHTML = ''
    chars.forEach((ch, i) => {
      const s = document.createElement('span')
      s.textContent = ch
      s.dataset.index = i
      if (ch === ' ') {
        s.classList.add('space')
      } else {
        const dur = Math.random() * 2 + 2
        const delay = Math.random() * 3
        s.style.animationDuration = `${dur}s`
        s.style.animationDelay = `${delay}s`
      }
      titleEl.appendChild(s)
    })

    const vid = document.getElementById('video-background')
    vid.volume = 0.25
    let taps = 0

    vid.addEventListener('ended', () => {
      vid.classList.add('fade-out')
      taps = 1
    })

    titleEl.addEventListener('click', () => {
      taps++

      if (taps === 1) {
        const spans = titleEl.querySelectorAll('span')
        const ySpans = Array.from(spans).filter(s => s.textContent.toUpperCase() === 'Y')
        const lastY = ySpans[ySpans.length - 1]

        spans.forEach(s => {
          if (s === lastY) s.classList.add('fallen')
          else s.classList.add('frozen')
        })
      } else if (taps === 2) {
        vid.classList.remove('fade-out')
        vid.classList.add('visible')
        vid.play()
      } else if (taps === 3) {
        vid.classList.add('fade-out')
        setTimeout(() => {
          vid.pause()
        }, 1000)
        taps = 1
      }
    })
  }
})

let sortedMacros

document.addEventListener('macrosLoaded', () => {
  const container = document.getElementById('macro-container')

  const pinned = macros.filter(m => m.pinned)
  const rest = macros.filter(m => !m.pinned)
  pinned.sort((a, b) => a.title.localeCompare(b.title))
  rest.sort((a, b) => a.title.localeCompare(b.title))
  sortedMacros = [...pinned, ...rest]

  sortedMacros.forEach((m, i) => {
    const card = document.createElement('div')
    card.className = 'macro-card'
    if (m.pinned) card.classList.add('essential-card')
    card.dataset.tags = m.tags.join(' ')

    const main = document.createElement('div')
    main.className = 'card-main-content'

    const title = document.createElement('h2')
    title.textContent = m.title

    if (m.hotkey) {
      const hk = document.createElement('span')
      hk.className = 'hotkey-recommendation'
      hk.textContent = m.hotkey
      title.appendChild(hk)
    }

    main.appendChild(title)

    if (m.description) {
      const desc = document.createElement('p')
      desc.className = 'description'
      desc.textContent = m.description
      main.appendChild(desc)
    }

    if (m.input) {
      const row = document.createElement('div')
      row.className = 'demo-row'

      const input = document.createElement('div')
      input.className = 'demo-box input-box'
      input.id = `macro-input-${i + 1}`
      input.textContent = m.input
      row.appendChild(input)

      const out = document.createElement('div')
      out.className = 'demo-box output-box'
      out.id = `macro-output-${i + 1}`
      out.innerHTML = m.output
      row.appendChild(out)

      main.appendChild(row)
    }

    if (m.input || m.wide_box_text) {
      const wide = document.createElement('div')
      wide.className = 'demo-box wide-box'
      wide.id = `macro-wide-${i + 1}`
      wide.textContent = m.input || m.wide_box_text
      main.appendChild(wide)
    }

    card.appendChild(main)

    const actions = document.createElement('div')
    actions.className = 'macro-actions-row'

    const btnWrap = document.createElement('div')

    if (m.input || m.wide_box_text) {
      const runBtn = document.createElement('button')
      runBtn.id = `run-btn-${i + 1}`
      runBtn.className = 'btn-outline'
      runBtn.textContent = '➜ Run'
      runBtn.setAttribute('onclick', `runMacro(${i})`)
      btnWrap.appendChild(runBtn)

      const revertBtn = document.createElement('button')
      revertBtn.id = `revert-btn-${i + 1}`
      revertBtn.className = 'btn-outline'
      revertBtn.textContent = '↩'
      revertBtn.setAttribute('onclick', `revertMacro(${i})`)
      btnWrap.appendChild(revertBtn)
    }

    const showBtn = document.createElement('button')
    showBtn.className = 'btn-outline'
    showBtn.textContent = 'Show Code'
    showBtn.setAttribute('onclick', `showCodeModal(this)`)
    btnWrap.appendChild(showBtn)

    const copyBtn = document.createElement('button')
    copyBtn.className = 'btn-outline'
    copyBtn.textContent = 'Copy'
    copyBtn.setAttribute('onclick', `copyCode(this)`)
    btnWrap.appendChild(copyBtn)

    actions.appendChild(btnWrap)

    const codeWrap = document.createElement('div')
    codeWrap.style.display = 'none'
    const codeEl = document.createElement('code')
    codeEl.textContent = m.code.trim()
    codeWrap.appendChild(codeEl)
    card.appendChild(codeWrap)

    const tagBox = document.createElement('div')
    tagBox.className = 'macro-tags'
    tagBox.textContent = m.tags.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')
    card.appendChild(tagBox)

    card.appendChild(actions)
    container.appendChild(card)
  })

  document.querySelectorAll('.macro-card').forEach(c => c.classList.add('show'))
  document.dispatchEvent(new Event('macrosRendered'))

  adjustFontSizes()
})

function adjustFontSizes() {
  const titles = document.querySelectorAll('.macro-card h2')
  titles.forEach(title => {
    const card = title.closest('.macro-card')
    let size = parseFloat(window.getComputedStyle(title).getPropertyValue('font-size'))
    while (title.scrollWidth > card.clientWidth - 20) {
      size -= 1
      title.style.fontSize = `${size}px`
    }
  })
}

function showCodeModal(btn) {
  const card = btn.closest('.macro-card')
  if (!card) return
  const code = card.querySelector('code').textContent

  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'

  const modal = document.createElement('div')
  modal.className = 'modal-content'

  const close = document.createElement('button')
  close.className = 'modal-close'
  close.innerHTML = '&times;'
  close.onclick = () => document.body.removeChild(overlay)

  const pre = document.createElement('pre')
  const codeEl = document.createElement('code')
  codeEl.textContent = code
  pre.appendChild(codeEl)

  modal.appendChild(close)
  modal.appendChild(pre)
  overlay.appendChild(modal)

  overlay.onclick = e => {
    if (e.target === overlay) {
      document.body.removeChild(overlay)
    }
  }

  document.body.appendChild(overlay)
}

function copyCode(btn) {
  const card = btn.closest('.macro-card')
  if (!card) return
  const codeEl = card.querySelector('code')
  if (!codeEl) return

  const text = codeEl.textContent.trim()

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!'
      setTimeout(() => { btn.textContent = 'Copy' }, 1200)
    }).catch(err => {
      console.error('clipboard failed, trying fallback:', err)
      copyTextFallback(text, btn)
    })
  } else {
    copyTextFallback(text, btn)
  }
}

function copyTextFallback(text, btn) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  ta.style.top = '-9999px'
  document.body.appendChild(ta)

  ta.focus()
  ta.select()

  try {
    const success = document.execCommand('copy')
    if (success) {
      btn.textContent = 'Copied!'
      setTimeout(() => { btn.textContent = 'Copy' }, 1200)
    } else {
      console.error('no luck with execCommand copy')
    }
  } catch (err) {
    console.error('Fallback copy crashed', err)
  }

  document.body.removeChild(ta)
}
