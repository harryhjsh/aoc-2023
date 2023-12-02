import { readFileSync } from 'fs';

export function lines_from_string(input: string) {
  return input.replaceAll('\r\n', '\n').split('\n');
}

export function lines_from_file(path: string) {
  return lines_from_string(readFileSync(path).toString());
}
