# Regex Garden

Regex Garden is an interactive regex debugger and learning tool built with React + Vite. It helps you visualize pattern structure, test against sample text, and step through matches in real time with a clean dark/light UI.

## What it offers

- Pattern input with live parsing and simplified syntax errors.
- Token breakdown: color-coded chips for anchors, quantifiers, groups, sets, literals, escapes, alternations; hover to see explanations.
- Test area: live highlighting of matches and capture groups across multi-line text.
- Timeline debugger: step/auto-play through matches, jump directly to a match, and auto-scroll to keep context.
- Reference drawer: built-in cheatsheet of common character classes, quantifiers, anchors, groups, flags, and recipes.
- Documentation modal: quick guide on visualize → test → debug workflow and best practices.
- Theme toggle: light/dark with subtle motion and responsive layout.

## Tech stack

- React 19 + Vite
- Tailwind (CDN) for styling
- lucide-react icon set
- Custom tokenizer and renderer in `utils/regexEngine.ts`

## How to use

- Enter a regex pattern in the top bar; invalid syntax shows a clear error.
- Paste or type sample text; matches highlight instantly, and you can select individual matches.
- Use the timeline controls to step, play/pause, or jump between matches.
- Hover tokens in the breakdown to read descriptions; open the reference drawer for deeper cheatsheets.
