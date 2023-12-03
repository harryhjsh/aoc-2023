import { lines_from_file, lines_from_string } from '../util.ts';

const p1_test = ``;

const p2_test = ``;

function p1(lines: string[]) {}

function p2(lines: string[]) {}

// console.log('1', p1(lines_from_file('./src/xx/input.txt')));
// console.log('2', p2(lines_from_file('./src/xx/input.txt')));

// p1(lines_from_string(p1_test));
// p2(lines_from_string(p2_test));

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest!;

  it('p1', () => {
    expect(p1(lines_from_string(p1_test))).toEqual(4361);
  });

  it('p2', () => {
    expect(p2(lines_from_string(p2_test))).toEqual(2286);
  });
}
