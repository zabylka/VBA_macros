macros.push({
  title: "Normalize Ordinals",
  tags: ["numerals"],
  input: "It is the 1st day of the month.",
  output: "It is the first day of the month.",
  code: `
' ======================================================================================================================================================================================================
Sub Numerals_Ordinals()
'                                           _           ___  ____  ____ ___ _   _    _    _     ____
'      _ __  _   _ _ __ ___   ___ _ __ __ _| |___ _    / _ \\|  _ \\|  _ \\_ _| \\ | |  / \\  | |   / ___|
'     | '_ \\| | | | '_ \` _ \\ / _ \\ '__/ _\` | / __(_)  | | | | |_) | | | | ||  \\| | / _ \\ | |   \\___ \\
'     | | | | |_| | | | | | |  __/ | | (_| | \\__ \\_   | |_| |  _ <| |_| | || |\\  |/ ___ \\| |___ ___) |
'     |_| |_|\\__,_|_| |_| |_|\\___|_|  \\__,_|_|___(_)   \\___/|_| \\_\\____/___|_| \\_/_/   \\_\\|_____|____/
' USAGE: Replaces "1st day of" with "first day of", etc. 1-10

    Dim ordinals As Variant
    ordinals = Array("first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth")
   
    Dim i As Integer
    For i = 1 To 10
        ReplaceWithout i & "st day of", ordinals(i - 1) & " day of"
    Next i
End Sub
`
});
