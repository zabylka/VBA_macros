macros.push({
  title: "Normalize Post-Q&A Capitalization",
  tags: ["cleaning", "case"],
  input: "Q   what happened next?\nA   i didn’t hear anything.",
  output: "Q   What happened next?\nA   I didn’t hear anything.",
  
  code: `
Sub Cleaning_Normalize_QA_Capitalization2()
    Dim doc As Document
    Dim searchRange As Range
    Dim matchRange As Range

    Set doc = ActiveDocument
    Set searchRange = doc.Content

    With searchRange.Find
        .ClearFormatting
        .Text = "^t([QA])^t([a-z])"
        .Replacement.Text = ""
        .Forward = True
        .Wrap = wdFindStop
        .Format = False
        .MatchCase = True
        .MatchWholeWord = False
        .MatchWildcards = True

        Do While .Execute
            Set matchRange = doc.Range(Start:=searchRange.Start, End:=searchRange.End)
            If matchRange.Characters.Count >= 1 Then
                matchRange.Characters(matchRange.Characters.Count).Text = _
                    UCase(matchRange.Characters(matchRange.Characters.Count).Text)
            End If
            searchRange.Collapse wdCollapseEnd
        Loop
    End With
End Sub
    `
});
