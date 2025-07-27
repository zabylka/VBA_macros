macros.push({
  title: "Comma to Period & Caps",
  tags: ["hotkey"],
  hotkey: "ALT+,",
  input: "yeah, well",
  output: "yeah.  Well",
  
  code: `
Sub Hotkey_Comma2PeriodCaps()
'
' set to alt+, - gets rid of last comma, turns to new sentence
' aka "yeah, well" to "yeah.  Well"
'
Dim rng As Range
Dim doc As Document
Set doc = ActiveDocument

    Selection.TypeText Text:="###"
    Selection.MoveLeft Unit:=wdCharacter, Count:=4
    Selection.TypeBackspace
    Selection.TypeBackspace
    Selection.TypeText Text:=".  ###"

    ' 2 - with uppercase
    Set rng = doc.Content
    With rng.Find
        .ClearFormatting
        .Text = "###([a-z])###"
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
            rng.Text = UCase(letter)
            rng.Collapse wdCollapseEnd
        Loop
    End With
End Sub
    `
});
