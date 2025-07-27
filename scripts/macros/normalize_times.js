macros.push({
  title: "Normalize Times",
  tags: ["numerals"],
  description: "Replaces \"1 o'clock\" with \"one o'clock\", etc. (1-10 only)",
  input: "It is 1 o'clock.",
  output: "It is one o'clock.",
  code: `
Sub Numerals_Times()
'                                          _          _____ ___ __  __ _____
'     _ __  _   _ _ __ ___   ___ _ __ __ _| |___ _   |_   _|_ _|  \/  | ____|
'    | '_ \\| | | | '_ \` _ \\ / _ \\ '__/ _\` | / __(_)    | |  | || |\\/| |  _|
'    | | | | |_| | | | | | |  __/ | | (_| | \\__ \\_     | |  | || |  | | |___
'    |_| |_|\\__,_|_| |_| |_|\\___|_|  \\__,_|_|___(_)    |_| |___|_|  |_|_____|
'    USAGE: Replaces "1 o'clock" with "one o'clock", etc.
    Dim numbers As Variant
    numbers = Array("one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten")
   
    Dim i As Integer
    For i = 1 To 10
        ReplaceWithout i & " o'clock", numbers(i - 1) & " o'clock"
    Next i
End Sub
`
});
