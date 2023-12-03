import { lines_from_file, lines_from_string } from '../util.ts';

const p1_test = `\
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const p2_test = p1_test;

function p1(lines: string[]) {
  const valid_numbers = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split('');

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      const surr = {
        r: line[j + 1],
        l: line[j - 1],
        u: lines[i - 1]?.[j],
        ur: lines[i - 1]?.[j - 1],
        ul: lines[i - 1]?.[j + 1],
        d: lines[i + 1]?.[j],
        dr: lines[i + 1]?.[j - 1],
        dl: lines[i + 1]?.[j + 1],
      };

      if (!isNaN(Number(surr.r)) && !isNaN(Number(char))) {
        // next is number
        line[j + 1] = `${char}${surr.r}`;
        line[j] = is_valid(surr) as any;
      } else if (is_valid(surr) && !isNaN(Number(char))) {
        valid_numbers.push(Number(char));
      }
    }
  }

  return valid_numbers.reduce((a, b) => a + b, 0);
}

function is_valid(surr: Record<string, any>) {
  const up = surr.u !== '.' && !!surr.u?.match(/\W/);
  const down = surr.d !== '.' && !!surr.d?.match(/\W/);

  const left = (() => {
    if (surr.l === true) return true;
    if (surr.l === false) return false;
    return surr.l !== '.' && !!surr.l?.match(/\W/);
  })();

  const right = surr.r !== '.' && !!surr.r?.match(/\W/);
  const upright = surr.ur !== '.' && !!surr.ur?.match(/\W/);
  const upleft = surr.ul !== '.' && !!surr.ul?.match(/\W/);
  const downright = surr.dr !== '.' && !!surr.dr?.match(/\W/);
  const downleft = surr.dl !== '.' && !!surr.dl?.match(/\W/);

  return (
    up || down || left || right || upright || upleft || downright || downleft
  );
}

function p2(lines: string[]) {
  const gear_ratios = [];

  const l = lines;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split('');

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      const surr = {
        r: line[j + 1],
        l: line[j - 1],
        u: lines[i - 1]?.[j],
        ur: lines[i - 1]?.[j - 1],
        ul: lines[i - 1]?.[j + 1],
        d: lines[i + 1]?.[j],
        dr: lines[i + 1]?.[j - 1],
        dl: lines[i + 1]?.[j + 1],
      };

      if (!isNaN(Number(surr.r)) && !isNaN(Number(char))) {
        // next is number
        line[j + 1] = Number(`${char}${surr.r}`) as any;

        line[j] = line[j + 1];
      }

      if (!isNaN(Number(surr.l)) && !isNaN(Number(char))) {
        line[j - 1] = line[j];
      }
    }

    l[i] = line as any;
  }

  for (let i = 0; i < l.length; i++) {
    const line = l[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      const surr = {
        r: line[j + 1],
        l: line[j - 1],
        u: lines[i - 1]?.[j],
        ur: lines[i - 1]?.[j - 1],
        ul: lines[i - 1]?.[j + 1],
        d: lines[i + 1]?.[j],
        dr: lines[i + 1]?.[j - 1],
        dl: lines[i + 1]?.[j + 1],
      };

      if (char === '*') {
        const surrounding_numbers = Array.from(
          new Set(Object.values(surr))
        ).filter((e) => e !== undefined && e !== '.');

        if (surrounding_numbers.length === 2) {
          gear_ratios.push(
            surrounding_numbers.reduce((a, b) => a * Number(b), 1)
          );
        }
      }
    }
  }

  return gear_ratios.reduce((a, b) => a + b, 0);
}

console.log('1', p1(lines_from_file('./src/03/input.txt'))); // 537832
console.log('2', p2(lines_from_file('./src/03/input.txt'))); // 81939900

// p1(lines_from_string(p1_test));
p2(lines_from_string(p2_test));

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest!;

  it('p1', () => {
    expect(p1(lines_from_string(p1_test))).toEqual(4361);
  });

  it('p2', () => {
    expect(p2(lines_from_string(p2_test))).toEqual(467835);
  });
}
