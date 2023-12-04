import { lines_from_file, lines_from_string } from '../util.ts';

const p1_test = `\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const p2_test = p1_test;

function p1(lines: string[]) {
  let sum = 0;
  for (const line of lines) {
    const num = winning_cards(line);

    const points = num.reduce((acc, b) => {
      if (acc === 0) {
        return 1;
      }

      return acc * 2;
    }, 0);

    sum += points;
  }

  return sum;
}

function p2(lines: string[]) {
  let i = 0;

  let total = 0;
  const copies = new Array(lines.length).fill(1);

  for (const line of lines) {
    const copies_of_this_card = copies[i];
    total += copies_of_this_card;

    const num = winning_cards(line).length;

    for (let j = 0; j < num; j++) {
      copies[i + j + 1] += 1 * copies_of_this_card;
    }

    i++;
  }

  return total;
}

function winning_cards(line: string) {
  const [_, cards] = line.split(': ');
  const [mine, winners] = cards.trim().split(' | ');

  const my = mine
    .trim()
    .split(' ')
    .filter((e) => !!e);
  const win = winners
    .trim()
    .split(' ')
    .filter((e) => !!e);

  return my.filter((e) => win.includes(e));
}

console.log('1', p1(lines_from_file('./src/04/input.txt'))); // 22897
console.log('2', p2(lines_from_file('./src/04/input.txt'))); // 5095824

// p1(lines_from_string(p1_test));
// p2(lines_from_string(p2_test));

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest!;

  it('p1', () => {
    expect(p1(lines_from_string(p1_test))).toEqual(13);
  });

  it('p2', () => {
    expect(p2(lines_from_string(p2_test))).toEqual(30);
  });
}
