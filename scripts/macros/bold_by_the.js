macros.push({
  title: "Bold BY (SPEAKER):",
  tags: ["formatting", "examination"],
  input: "BY ATTY. SMITH:",
  output: "<b>BY ATTY. SMITH:</b>",
  
  code: `
Sub Formatting_Bold_ByTheEXAMINER()
    Dim rng As Range
    Set rng = ActiveDocument.Content
    With rng.Find
        .ClearFormatting
        .Text = "^13BY THE*"
        .MatchWildcards = True
        .Forward = True
        .Wrap = wdFindStop
        Do While .Execute
            rng.MoveEndUntil Cset:=vbCr, Count:=wdForward
            rng.Font.Bold = True
            rng.Collapse wdCollapseEnd
        Loop
    End With
End Sub
    `
});
