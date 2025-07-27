macros.push({
  title: "Period to Comma & Lowercase",
  tags: ["hotkey"],
  hotkey: "ALT+SHIFT+,",
  input: "yeah.  Well",
  output: "yeah, well",
  code: `
Sub Hotkey_period2comma()
'
' set to alt+shift+, - opposite of back2caps
' aka "yeah.  Well" to "yeah, well"
'
Dim rng As Range
Dim doc As Document
Set doc = ActiveDocument

    Selection.TypeText Text:="###"
    Selection.MoveLeft Unit:=wdCharacter, Count:=4
    Selection.TypeText Text:="###"
    Selection.MoveLeft Unit:=wdCharacter, Count:=3
    Selection.TypeBackspace
    Selection.TypeBackspace
    Selection.TypeBackspace
    Selection.TypeText Text:=", "

    ' 2 - with lowercase
    Set rng = doc.Content
    With rng.Find
        .ClearFormatting
        .Text = "###([A-Z])###"
        .Replacement.Text = ""
        .Forward = True
        .Wrap = wdFindStop
        .Format = False
        .MatchCase = True
        .MatchWholeWord = False
        .MatchWildcards = True

        Do While .Execute
            Dim letter As String
            letter = Mid(rng.Text, 4, 1) ' yanks the letter out
            rng.Text = LCase(letter)
            rng.Collapse wdCollapseEnd
        Loop
    End With
End Sub
    `
});
