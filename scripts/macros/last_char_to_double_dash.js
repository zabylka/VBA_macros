macros.push({
  title: "Last Char to Double Dash",
  tags: ["hotkey"],
  hotkey: "ALT+:",
  input: "is, I think",
  output: "is -- I think",
  code: `
Sub Hotkey_lastChar2doubleDash()
'
' Back2Dash Macro - i use alt+;
'
' "is, I think" to "is -- I think"
    Selection.TypeBackspace
    Selection.TypeText Text:=" --"
End Sub
    `
});
