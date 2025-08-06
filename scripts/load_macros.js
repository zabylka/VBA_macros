// 🧩 Load and run all macro scripts, then fire the "macrosLoaded" event

const macroFiles = [
  'bold_by_the.js',
  'colloquy_formatting.js',
  'comma_to_period_caps.js',
  'last_char_to_double_dash.js',
  'normalize_qa_caps.js',
  'period_to_comma_lowercase.js',
  'essential_functions.js',
  'speaker_colon_spacing.js',
  'normalize_oh_casing.js',
  'normalize_double_dash_casing.js',
  'normalize_times.js',
  'normalize_ordinals.js',
  'normalize_percentages.js',
  'normalize_dollars.js',
  'normalize_exhibit_numbers.js'
]

const macroPromises = macroFiles.map(file => {
  return fetch(`scripts/macros/${file}`).then(res => res.text())
})

Promise.all(macroPromises).then(allCode => {
  allCode.forEach(code => {
    try {
      const runIt = new Function(code)
      runIt()
    } catch (err) {
      console.error('🤕 me brokey:', err)
    }
  })

  document.dispatchEvent(new Event('macrosLoaded'))
})
