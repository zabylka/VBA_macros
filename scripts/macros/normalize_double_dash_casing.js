macros.push({
  title: "Normalize Double-Dash Casing",
  tags: ["cleaning", "casing"],
  input: 'This is a path -- She didn\'t know.',
  output: 'This is a path -- she didn\'t know.',
  code: `
Sub Cleaning_Normalize_DoubleDashCasing()
    Dim rng As Range
    Dim doc As Document
    Set doc = ActiveDocument

    ' 1- finds "-- [A-Z]", wraps with placeholder ###
    With doc.Content.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .Text = "(--[\\ ]{1,})([A-Z])"
        .Replacement.Text = "\\1###\\2###"
        .Forward = True
        .Wrap = wdFindContinue
        .Format = False
        .MatchCase = True
        .MatchWholeWord = False
        .MatchWildcards = True
        .Execute Replace:=wdReplaceAll
    End With

    ' 2 - replaces place-held with lowercase
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
