macros.push({
  title: "Normalize Percentages",
  tags: ["numerals"],
  description: "Replaces \"99%\" with \"ninety-nine percent\", etc. (under 100 only)",
  input: "A total of 99% of the participants.",
  output: "A total of ninety-nine percent of the participants.",
  code: `
Sub Numerals_Percent()
    Dim i As Integer
    For i = 99 To 1 Step -1
        ReplaceWithout i & "%", NumberToWords(i) & " percent"
    Next i
End Sub

Function NumberToWords(ByVal num As Integer) As String
    Dim ones As Variant
    ones = Array("", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", _
                 "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", _
                 "sixteen", "seventeen", "eighteen", "nineteen")
    
    Dim tens As Variant
    tens = Array("", "", "twenty", "thirty", "forty", "fifty", "sixty", _
                 "seventy", "eighty", "ninety")
    
    If num < 20 Then
        NumberToWords = ones(num)
    Else
        NumberToWords = tens(Int(num / 10))
        If num Mod 10 <> 0 Then
            NumberToWords = NumberToWords & "-" & ones(num Mod 10)
        End If
    End If
End Function
`
});
