macros.push({
  title: "Standardize 'Oh'",
  tags: ["cleaning", "casing", "punctuation"],
  input: 'oh, what a day.',
  output: 'Oh. What a day.',
  code: `
Sub Cleaning_Casing_Oh()
    ' Change all instances of "oh, blah blah" to "Oh. Blah blah"
'    ReplaceWithWildcards "oh, ([a-z])", "Oh.  \\1"
    ReplaceWithWildcards "Oh, ([a-z])", "Oh.  \\1"
'    ReplaceWithWildcards "oh, ([A-Z])", "Oh.  \\1"
    ReplaceWithWildcards "(^t)<oh>, ([A-Za-z])", "\\1Oh.  \\2"
    
    Dim rng As Range
    Set rng = ActiveDocument.Content
    
    With rng.Find
    .ClearFormatting
    .Text = "Oh.  [a-z]"
    .Forward = True
    .Wrap = wdFindStop
    .MatchWildcards = True
    
    Do While .Execute
        rng.Start = rng.Start + 7
        rng.End = rng.Start + 1
        rng.Text = UCase(rng.Text)
        rng.Collapse wdCollapseEnd
    Loop
    End With
End Sub
`
});
