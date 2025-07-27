macros.push({
  title: "Normalize Exhibit Numbers",
  tags: ["numerals"],
  input: "See exhibit twenty-three.",
  output: "See Exhibit 23.",
  code: `
Sub Numerals_ExhibitNumNormalization()
    Dim wordToNum As Object: Set wordToNum = CreateObject("Scripting.Dictionary")
    Dim key As Variant

    ' Word ? numeral dictionary (1–99)
    wordToNum.Add "one", "1"
    wordToNum.Add "two", "2"
    wordToNum.Add "three", "3"
    wordToNum.Add "four", "4"
    wordToNum.Add "five", "5"
    wordToNum.Add "six", "6"
    wordToNum.Add "seven", "7"
    wordToNum.Add "eight", "8"
    wordToNum.Add "nine", "9"
    wordToNum.Add "ten", "10"
    wordToNum.Add "eleven", "11"
    wordToNum.Add "twelve", "12"
    wordToNum.Add "thirteen", "13"
    wordToNum.Add "fourteen", "14"
    wordToNum.Add "fifteen", "15"
    wordToNum.Add "sixteen", "16"
    wordToNum.Add "seventeen", "17"
    wordToNum.Add "eighteen", "18"
    wordToNum.Add "nineteen", "19"
    wordToNum.Add "twenty", "20"
    wordToNum.Add "twenty-one", "21"
    wordToNum.Add "twenty-two", "22"
    wordToNum.Add "twenty-three", "23"
    wordToNum.Add "twenty-four", "24"
    wordToNum.Add "twenty-five", "25"
    wordToNum.Add "twenty-six", "26"
    wordToNum.Add "twenty-seven", "27"
    wordToNum.Add "twenty-eight", "28"
    wordToNum.Add "twenty-nine", "29"
    wordToNum.Add "thirty", "30"
    wordToNum.Add "thirty-one", "31"
    wordToNum.Add "thirty-two", "32"
    wordToNum.Add "thirty-three", "33"
    wordToNum.Add "thirty-four", "34"
    wordToNum.Add "thirty-five", "35"
    wordToNum.Add "thirty-six", "36"
    wordToNum.Add "thirty-seven", "37"
    wordToNum.Add "thirty-eight", "38"
    wordToNum.Add "thirty-nine", "39"
    wordToNum.Add "forty", "40"
    wordToNum.Add "forty-one", "41"
    wordToNum.Add "forty-two", "42"
    wordToNum.Add "forty-three", "43"
    wordToNum.Add "forty-four", "44"
    wordToNum.Add "forty-five", "45"
    wordToNum.Add "forty-six", "46"
    wordToNum.Add "forty-seven", "47"
    wordToNum.Add "forty-eight", "48"
    wordToNum.Add "forty-nine", "49"
    wordToNum.Add "fifty", "50"
    wordToNum.Add "fifty-one", "51"
    wordToNum.Add "fifty-two", "52"
    wordToNum.Add "fifty-three", "53"
    wordToNum.Add "fifty-four", "54"
    wordToNum.Add "fifty-five", "55"
    wordToNum.Add "fifty-six", "56"
    wordToNum.Add "fifty-seven", "57"
    wordToNum.Add "fifty-eight", "58"
    wordToNum.Add "fifty-nine", "59"
    wordToNum.Add "sixty", "60"
    wordToNum.Add "sixty-one", "61"
    wordToNum.Add "sixty-two", "62"
    wordToNum.Add "sixty-three", "63"
    wordToNum.Add "sixty-four", "64"
    wordToNum.Add "sixty-five", "65"
    wordToNum.Add "sixty-six", "66"
    wordToNum.Add "sixty-seven", "67"
    wordToNum.Add "sixty-eight", "68"
    wordToNum.Add "sixty-nine", "69"
    wordToNum.Add "seventy", "70"
    wordToNum.Add "seventy-one", "71"
    wordToNum.Add "seventy-two", "72"
    wordToNum.Add "seventy-three", "73"
    wordToNum.Add "seventy-four", "74"
    wordToNum.Add "seventy-five", "75"
    wordToNum.Add "seventy-six", "76"
    wordToNum.Add "seventy-seven", "77"
    wordToNum.Add "seventy-eight", "78"
    wordToNum.Add "seventy-nine", "79"
    wordToNum.Add "eighty", "80"
    wordToNum.Add "eighty-one", "81"
    wordToNum.Add "eighty-two", "82"
    wordToNum.Add "eighty-three", "83"
    wordToNum.Add "eighty-four", "84"
    wordToNum.Add "eighty-five", "85"
    wordToNum.Add "eighty-six", "86"
    wordToNum.Add "eighty-seven", "87"
    wordToNum.Add "eighty-eight", "88"
    wordToNum.Add "eighty-nine", "89"
    wordToNum.Add "ninety", "90"
    wordToNum.Add "ninety-one", "91"
    wordToNum.Add "ninety-two", "92"
    wordToNum.Add "ninety-three", "93"
    wordToNum.Add "ninety-four", "94"
    wordToNum.Add "ninety-five", "95"
    wordToNum.Add "ninety-six", "96"
    wordToNum.Add "ninety-seven", "97"
    wordToNum.Add "ninety-eight", "98"
    wordToNum.Add "ninety-nine", "99"

    ' Replace spelled-out numbers: exhibit twenty-three ? Exhibit 23
    Dim sortedKeys As Object: Set sortedKeys = CreateObject("System.Collections.ArrayList")
    For Each key In wordToNum.Keys
    sortedKeys.Add key
    Next
    sortedKeys.Sort
    sortedKeys.Reverse  ' Longest first

    For Each key In sortedKeys
    ReplaceWithWildcards "[Ee]xhibit[ ,]{1,}" & key, "Exhibit " & wordToNum(key)
    Next

    ' Capitalize: exhibit 21 ? Exhibit 21
    ReplaceWithWildcards "[Ee]xhibit[ ,]{1,}([0-9]{1,})", "Exhibit \\1"
End Sub
`
});
