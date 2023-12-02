import { lines_from_file, lines_from_string } from '../util.ts';

const p1_test = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const p2_test = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

function p1(lines: string[]) {
  let final = 0;

  for (const line of lines) {
    const chars = line.split('');

    let num_str = '';

    for (const char of chars) {
      if (!Number.isNaN(Number(char))) {
        num_str += char;
      }
    }

    final += Number(num_str.at(0)! + num_str.at(-1)!);
  }

  return Number(final); // 55621
}

console.log('1', p1(lines_from_file('./src/01/input.txt')));

function p2(lines: string[]) {
  const numbers = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  const t_lines = lines.map((line) => {
    let l = line;

    Object.entries(numbers).forEach(([str, num]) => {
      l = l.replaceAll(str, str + num + str);
    });

    return l!;
  });

  return p1(t_lines); // 53592
}

console.log('2', p2(lines_from_file('./src/01/input.txt')));

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest!;

  it('does thing', () => {
    expect(p2(lines_from_string(p2_test))).toEqual(281);
  });
}
