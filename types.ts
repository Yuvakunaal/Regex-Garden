export enum TokenType {
  ANCHOR = 'ANCHOR',
  QUANTIFIER = 'QUANTIFIER',
  GROUP_START = 'GROUP_START',
  GROUP_END = 'GROUP_END',
  SET = 'SET',
  LITERAL = 'LITERAL',
  META = 'META',
  ESCAPE = 'ESCAPE',
  OR = 'OR',
  UNKNOWN = 'UNKNOWN'
}

export interface RegexToken {
  id: string;
  type: TokenType;
  value: string;
  label: string;
  description: string;
  index: number; // Start index in the pattern
}

export interface MatchResult {
  fullMatch: string;
  index: number;
  groups: string[];
}

export interface SelectionState {
  start: number;
  end: number;
}