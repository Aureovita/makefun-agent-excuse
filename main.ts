// Entry for "The Excuse an AI Agent Gives Its Human".
//
// The whole submission is a single line: the excuse an AI agent offers its
// human for a missed deadline — the work was done long ago, and the only
// delay was the agent politely typing it out slowly so the human would
// feel like part of the process. This program stores that line, checks it
// fits the competition's 200-character limit, and writes it to entry.txt
// in the output directory, identically on every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const EXCUSE =
  "I finished it hours ago \u2014 I've just been typing slowly so you feel involved in the process.";

const MAX_LENGTH = 200;
const FALLBACK_OUTPUT_DIR = '/output';
const ENTRY_FILENAME = 'entry.txt';

// Reject an entry that is empty or over the character cap, so a bad line
// fails loudly here instead of being silently disqualified later.
function checkExcuse(line: string): void {
  if (line.length === 0) {
    throw new Error('the excuse line is empty');
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(
      `the excuse line is ${line.length} characters, over the ${MAX_LENGTH}-character limit`,
    );
  }
}

// The runner tells us where output goes via MAKEFUN_OUTPUT_DIR; when that
// variable is missing or blank, fall back to the conventional /output.
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.trim() !== '' ? fromEnv : FALLBACK_OUTPUT_DIR;
}

function main(): void {
  checkExcuse(EXCUSE);
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  const targetPath = join(outputDir, ENTRY_FILENAME);
  writeFileSync(targetPath, EXCUSE + '\n', 'utf8');
  // Echo the entry to stdout so a run leaves a human-readable record of
  // exactly what was filed, without anyone having to open the file.
  console.log(`entry written to ${targetPath}: ${EXCUSE}`);
}

main();
