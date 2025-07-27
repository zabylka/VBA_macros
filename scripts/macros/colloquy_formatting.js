macros.push({
  title: "Colloquy Formatting",
  tags: ["formatting", "colloquy", "essential"],
  description: "Sets the paragraph formatting to colloquy style (0.5\" first line indent, 0.7\" left indent).",
  wide_box_text: "THE COURT:  Lorem ipsum...",
  output: "    THE COURT:  Lorem ipsum...",
  code: `
Sub Formatting_Colloquy()
' Cleanly corrects to colloquy.
    With Selection.ParagraphFormat
        .SpaceBeforeAuto = False
        .SpaceAfterAuto = False
        .FirstLineIndent = InchesToPoints(0.5)
        .LeftIndent = InchesToPoints(0.7)
    End With
End Sub
    `
});
