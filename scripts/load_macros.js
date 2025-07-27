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
];

Promise.all(macroFiles.map(file => fetch(`scripts/macros/${file}`).then(response => response.text())))
  .then(scripts => {
    scripts.forEach(script => {
      try {
        (new Function(script))();
      } catch (e) {
        console.error('Error executing script:', e);
      }
    });
    document.dispatchEvent(new Event('macrosLoaded'));
  });
