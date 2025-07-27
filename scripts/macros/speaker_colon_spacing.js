macros.push({
  title: "Normalize Spacing After Speaker Label",
  tags: ["cleaning", "spacing", "colloquy"],
  input: "SPEAKER: A",
  output: "SPEAKER:  A",
  code: `
Sub Cleaning_Spacing_SpeakerColon2SpacesCapital()
    Dim i As Integer
    Dim capitalLetter As String

    For i = 65 To 90
        capitalLetter = Chr(i)
        ReplaceWithWildcards ": " & capitalLetter, ":  " & capitalLetter
    Next i
End Sub
    `
});
