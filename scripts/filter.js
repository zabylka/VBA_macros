// filter
document.addEventListener('macrosLoaded', () => {
  const tagBtns = document.querySelectorAll('.tag-btn')
  const macroBoxes = document.querySelectorAll('.macro-card')
  const allBtn = document.querySelector('[data-tag="all"]')
  const activeTags = new Set()

  function tagClicked(e) {
    const btn = e.target
    const tag = btn.dataset.tag

    if (tag === 'all') {
      activeTags.clear()
      tagBtns.forEach(b => b.classList.remove('active'))
      allBtn.classList.add('active')
    } else {
      allBtn.classList.remove('active')

      if (activeTags.has(tag)) {
        activeTags.delete(tag)
        btn.classList.remove('active')
      } else {
        activeTags.add(tag)
        btn.classList.add('active')
      }
    }

    if (!activeTags.size) {
      allBtn.classList.add('active')
    }

    updateBoxes()
  }

  function updateBoxes() {
    macroBoxes.forEach(box => {
      const boxTags = box.dataset.tags ? box.dataset.tags.split(' ') : []
      const visible = !activeTags.size || [...activeTags].some(t => boxTags.includes(t))

      if (visible) {
        box.style.display = ''
        setTimeout(() => box.classList.add('show'), 10)
      } else {
        box.classList.remove('show')
        setTimeout(() => {
          box.style.display = 'none'
        }, 400)
      }
    })
  }

  tagBtns.forEach(btn => btn.addEventListener('click', tagClicked))

  allBtn.classList.add('active')
  updateBoxes()
})
