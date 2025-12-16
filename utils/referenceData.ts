export interface ReferenceItem {
  symbol: string;
  name: string;
  description: string;
  example: string;
}

export interface ReferenceCategory {
  title: string;
  items: ReferenceItem[];
}

export const referenceData: ReferenceCategory[] = [
  {
    title: "Character Classes",
    items: [
      { symbol: ".", name: "Dot", description: "Matches any single character except line breaks.", example: "/./ matches 'a', '9', '%'" },
      { symbol: "\\w", name: "Word Char", description: "Alphanumeric character [a-zA-Z0-9_].", example: "/\\w/ matches 'A', 'b', '5'" },
      { symbol: "\\d", name: "Digit", description: "Any digit [0-9].", example: "/\\d/ matches '4', '9'" },
      { symbol: "\\s", name: "Whitespace", description: "Any whitespace (space, tab, newline).", example: "/\\s/ matches ' '" },
      { symbol: "[abc]", name: "Set", description: "Matches any character in the brackets.", example: "/[aeiou]/ matches 'e'" },
      { symbol: "[^abc]", name: "Negated Set", description: "Matches any character NOT in the brackets.", example: "/[^0-9]/ matches 'a'" },
    ]
  },
  {
    title: "Quantifiers",
    items: [
      { symbol: "*", name: "0 or more", description: "Matches previous token zero or more times.", example: "/a*/ matches '', 'a', 'aaaa'" },
      { symbol: "+", name: "1 or more", description: "Matches previous token one or more times.", example: "/a+/ matches 'a', 'aa'" },
      { symbol: "?", name: "Optional", description: "Matches previous token zero or one time.", example: "/colou?r/ matches 'color'" },
      { symbol: "{n}", name: "Exactly n", description: "Matches exactly n times.", example: "/\\d{3}/ matches '123'" },
      { symbol: "{n,}", name: "n or more", description: "Matches n or more times.", example: "/\\d{2,}/ matches '12', '1234'" },
    ]
  },
  {
    title: "Anchors",
    items: [
      { symbol: "^", name: "Start", description: "Matches the start of the string (or line in multiline).", example: "/^Hello/ matches 'Hello' at start" },
      { symbol: "$", name: "End", description: "Matches the end of the string (or line).", example: "/end$/ matches 'end' at end" },
      { symbol: "\\b", name: "Word Boundary", description: "Matches position between word and non-word char.", example: "/\\bcat\\b/ matches 'cat' in 'a cat'" },
    ]
  },
  {
    title: "Groups & Lookaround",
    items: [
      { symbol: "(...)", name: "Capturing Group", description: "Groups tokens and creates a capture group.", example: "/(ab)+/ matches 'abab'" },
      { symbol: "(?:...)", name: "Non-Capturing", description: "Groups tokens without creating a capture group.", example: "/(?:ab)+/ matches 'abab'" },
      { symbol: "(?=...)", name: "Positive Lookahead", description: "Matches if followed by pattern (without consuming).", example: "/a(?=b)/ matches 'a' in 'ab'" },
      { symbol: "(?!...)", name: "Negative Lookahead", description: "Matches if NOT followed by pattern.", example: "/a(?!b)/ matches 'a' in 'ac'" },
    ]
  },
  {
    title: "Common Flags",
    items: [
      { symbol: "g", name: "Global", description: "Find all matches rather than stopping after the first.", example: "/a/g matches all 'a's" },
      { symbol: "m", name: "Multiline", description: "^ and $ match start/end of line.", example: "/^/m matches start of lines" },
      { symbol: "i", name: "Case Insensitive", description: "Case insensitive match.", example: "/a/i matches 'A'" },
    ]
  },
  {
    title: "Common Recipes",
    items: [
      { 
        symbol: "@", 
        name: "Email Validation", 
        description: "Matches emails like abc@gmail.com.", 
        example: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" 
      }
    ]
  }
];