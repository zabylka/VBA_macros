macros.push({
  title: "Normalize Dollars",
  tags: ["numerals"],
  description: "Replaces \"$1\" with \"1 dollar\" and \"$5\" with \"5 dollars\", but leaves decimal numbers (like 2.50) alone.",
  input: "The price is $5, but not $2.50.",
  output: "The price is 5 dollars, but not $2.50.",
  code: `
Sub Numerals_Dollars()
    Dim regex As Object
    Set regex = CreateObject("VBScript.RegExp")

    With regex
        .Global = True
        .Pattern = "\\$(\\d+)(?!\\.\\d)"  ' Match $number NOT followed by .digit
    End With

    Dim docRange As Range
    Set docRange = ActiveDocument.Content

    Dim matches As Object
    Set matches = regex.Execute(docRange.Text)

    ' Work backwards to avoid offsetting replacements
    Dim i As Long
    For i = matches.Count - 1 To 0 Step -1
        Dim match As Object
        Set match = matches(i)

        Dim fullMatch As String
        fullMatch = match.Value

        Dim num As String
        num = match.SubMatches(0)

        Dim replacement As String
        If Val(num) = 1 Then
            replacement = num & " dollar"
        Else
            replacement = num & " dollars"
        End If

        ' Replace match in the document using range
        Dim r As Range
        Set r = ActiveDocument.Range(match.FirstIndex, match.FirstIndex + Len(fullMatch))
        r.Text = replacement
    Next i
End Sub
`
});
