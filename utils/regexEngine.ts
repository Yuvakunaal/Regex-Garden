import { RegexToken, TokenType } from '../types';

let tokenIdCounter = 0;
const generateId = () => `token-${tokenIdCounter++}`;

// A simple lexical analyzer for JS Regex visualization
// This isn't a full engine, but enough to visualize structure
export const tokenizeRegex = (pattern: string): RegexToken[] => {
  const tokens: RegexToken[] = [];
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];
    
    // Escaped characters
    if (char === '\\') {
      if (i + 1 < pattern.length) {
        const nextChar = pattern[i + 1];
        let type = TokenType.ESCAPE;
        let desc = `Escaped character: ${nextChar}`;
        let label = 'Escaped';

        if (['d', 'D', 'w', 'W', 's', 'S', 'b', 'B'].includes(nextChar)) {
          type = TokenType.META;
          label = 'Metachar';
          if (nextChar === 'd') desc = 'Digit [0-9]';
          if (nextChar === 'w') desc = 'Word character [a-zA-Z0-9_]';
          if (nextChar === 's') desc = 'Whitespace';
          if (nextChar === 'b') desc = 'Word boundary';
        }

        tokens.push({
          id: generateId(),
          type,
          value: `\\${nextChar}`,
          label,
          description: desc,
          index: i
        });
        i += 2;
        continue;
      }
    }

    // Anchors
    if (char === '^' || char === '$') {
      tokens.push({
        id: generateId(),
        type: TokenType.ANCHOR,
        value: char,
        label: 'Anchor',
        description: char === '^' ? 'Start of string (or line)' : 'End of string (or line)',
        index: i
      });
      i++;
      continue;
    }

    // Quantifiers
    if (['*', '+', '?'].includes(char)) {
       tokens.push({
        id: generateId(),
        type: TokenType.QUANTIFIER,
        value: char,
        label: 'Quantifier',
        description: char === '*' ? '0 or more' : char === '+' ? '1 or more' : 'Optional (0 or 1)',
        index: i
      });
      i++;
      continue;
    }
    
    // Explicit Quantifiers {min,max}
    if (char === '{') {
      const closingIndex = pattern.indexOf('}', i);
      if (closingIndex !== -1) {
        const content = pattern.slice(i, closingIndex + 1);
        tokens.push({
          id: generateId(),
          type: TokenType.QUANTIFIER,
          value: content,
          label: 'Count',
          description: `Matches the previous token ${content} times`,
          index: i
        });
        i = closingIndex + 1;
        continue;
      }
    }

    // Groups
    if (char === '(') {
      let label = 'Group';
      let desc = 'Capturing group start';
      let value = '(';
      let advance = 1;

      // Check for non-capturing or lookarounds
      if (pattern[i + 1] === '?') {
         if (pattern[i + 2] === ':') {
             label = 'Non-Cap';
             desc = 'Non-capturing group start';
             value = '(?:';
             advance = 3;
         } else if (pattern[i + 2] === '=') {
             label = 'Lookahead';
             desc = 'Positive lookahead';
             value = '(?=';
             advance = 3;
         } else if (pattern[i + 2] === '!') {
             label = 'Neg Lookahead';
             desc = 'Negative lookahead';
             value = '(?!';
             advance = 3;
         }
      }

      tokens.push({
        id: generateId(),
        type: TokenType.GROUP_START,
        value,
        label,
        description: desc,
        index: i
      });
      i += advance;
      continue;
    }

    if (char === ')') {
      tokens.push({
        id: generateId(),
        type: TokenType.GROUP_END,
        value: ')',
        label: 'Group End',
        description: 'End of group',
        index: i
      });
      i++;
      continue;
    }

    // Sets [abc]
    if (char === '[') {
      let closingIndex = -1;
      // Handle escaped brackets inside sets
      for (let j = i + 1; j < pattern.length; j++) {
        if (pattern[j] === ']' && pattern[j-1] !== '\\') {
          closingIndex = j;
          break;
        }
      }

      if (closingIndex !== -1) {
        const content = pattern.slice(i, closingIndex + 1);
        tokens.push({
          id: generateId(),
          type: TokenType.SET,
          value: content,
          label: 'Set',
          description: `Matches any character in ${content}`,
          index: i
        });
        i = closingIndex + 1;
        continue;
      }
    }

    // Alternation
    if (char === '|') {
       tokens.push({
        id: generateId(),
        type: TokenType.OR,
        value: '|',
        label: 'OR',
        description: 'Alternation (matches left or right)',
        index: i
      });
      i++;
      continue;
    }

    // Dot
    if (char === '.') {
       tokens.push({
        id: generateId(),
        type: TokenType.META,
        value: '.',
        label: 'Wildcard',
        description: 'Matches any character (except newline)',
        index: i
      });
      i++;
      continue;
    }

    // Literal (group consecutive literals)
    tokens.push({
        id: generateId(),
        type: TokenType.LITERAL,
        value: char,
        label: 'Literal',
        description: `Matches character "${char}" literally`,
        index: i
    });
    i++;
  }

  return tokens;
};

export const getColorForTokenType = (type: TokenType): string => {
  // Returns classes for: Text Color, Background, Border
  switch (type) {
    case TokenType.ANCHOR: 
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-400/10 border-purple-200 dark:border-purple-400/20';
    case TokenType.QUANTIFIER: 
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-400/10 border-orange-200 dark:border-orange-400/20';
    case TokenType.GROUP_START: 
    case TokenType.GROUP_END: 
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20';
    case TokenType.SET: 
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 border-green-200 dark:border-green-400/20';
    case TokenType.ESCAPE:
    case TokenType.META: 
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/10 border-yellow-200 dark:border-yellow-400/20';
    case TokenType.OR: 
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10 border-red-200 dark:border-red-400/20';
    case TokenType.LITERAL: 
        return 'text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600';
    default: 
        return 'text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  }
};