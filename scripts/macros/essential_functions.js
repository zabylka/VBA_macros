macros.push({
  title: "Essential Functions",
  tags: ["essential"],
  pinned: true,
  description: "These functions are needed to make find & replace scripts work.",
  code: `
Sub ReplaceWithWildcards(findText As String, replaceText As String)
'  FIND & REPLACE - (WITH WILDCARDS)
    With Selection.Find
        .Text = findText
        .Replacement.Text = replaceText
        .Forward = True
        .Wrap = wdFindContinue
        .Format = False
        .MatchCase = True
        .MatchWholeWord = False
        .MatchWildcards = True
        .Execute Replace:=wdReplaceAll
    End With
End Sub
Sub ReplaceWithout(findText As String, replaceText As String)
' FIND & REPLACE - (WITHOUT WILDCARDS)
    With Selection.Find
        .Text = findText
        .Replacement.Text = replaceText
        .Forward = True
        .Wrap = wdFindContinue
        .Format = False
        .MatchCase = True
        .MatchWholeWord = False
        .MatchWildcards = False
        .Execute Replace:=wdReplaceAll
    End With
End Sub
    `
});
