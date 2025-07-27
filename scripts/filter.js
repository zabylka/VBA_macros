document.addEventListener('macrosLoaded', () => {
  const tagButtons = document.querySelectorAll('.tag-btn');
  const macroCards = document.querySelectorAll('.macro-card');
  const allButton = document.querySelector('[data-tag="all"]');
  const selectedTags = new Set();

  // handle tag clicks
  function handleTagClick(e) {
    const clickedButton = e.target;
    const tag = clickedButton.dataset.tag;

    // if "all" is clicked
    if (tag === 'all') {
      selectedTags.clear();
      tagButtons.forEach(btn => btn.classList.remove('active'));
      allButton.classList.add('active');
    } else {
      allButton.classList.remove('active');

      // toggle tag state
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        clickedButton.classList.remove('active');
      } else {
        selectedTags.add(tag);
        clickedButton.classList.add('active');
      }
    }

    // if nothing is selected, fallback to "all"
    if (selectedTags.size === 0) {
      allButton.classList.add('active');
    }

    filterMacroCards();
  }

  // show/hide cards based on tags
  function filterMacroCards() {
    macroCards.forEach(card => {
      const cardTags = card.dataset.tags.split(' ');
      const hasMatchingTag = selectedTags.size === 0 || [...selectedTags].some(tag => cardTags.includes(tag));

      if (hasMatchingTag) {
        card.style.display = '';
        setTimeout(() => card.classList.add('show'), 10);
      } else {
        card.classList.remove('show');
        setTimeout(() => (card.style.display = 'none'), 400);
      }
    });
  }

  // bind tag buttons
  tagButtons.forEach(btn => btn.addEventListener('click', handleTagClick));

  // show everything by default
  allButton.classList.add('active');
  filterMacroCards();
});
