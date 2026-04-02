# Subf

Substitute all occurrences of strings with their replacements.
Substitution pairs are read from a TSV file.

## Usage

```sh
subf <replacements.tsv> <input.txt>
```

The result is printed to stdout.

### Replacements File Format

The replacements file is a TSV (tab-separated values) file
where each line contains a match and its replacement, separated by a tab:

```tsv
value	replacement
broken	correct
```

- Lines starting with `#` are treated as comments.
- Matches are case-insensitive and respect word boundaries,
  so `val` won't match inside `valuable`.
- Replacements starting with `\u` are interpreted as Unicode code points
  (e.g. `\u0041` becomes `A`).

### Example

Given `replacements.tsv`:

```tsv
val	replacement
broken	correct
```

And `example.txt`:

```
val
  val
another val
valuable

Broken
  BROKEN
it is broken
```

Running `subf replacements.tsv example.txt` outputs:

```
replacement
  replacement
another replacement
valuable

correct
  correct
it is correct
```

## Installation

```sh
npm install subf
```

## Library Usage

Subf can also be used as a library:

```ts
import { searchAndReplace } from "subf"

const result = await searchAndReplace("replacements.tsv", "input.txt")
```

## Development

A Nix flake is provided for reproducible setup:

```sh
nix develop
```

Check out the [makefile](./makefile) for available commands.
