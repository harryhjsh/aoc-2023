import { lines_from_file, lines_from_string } from '../util.ts';

const p1_test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const p2_test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

function p1(lines: string[]) {
  const max: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;

  lines.forEach((line, i) => {
    const selections_with_cubes_split = get_selections_with_cubes_split(line);

    const all_selections_possible = selections_with_cubes_split.reduce(
      (acc, selection) => {
        if (acc === false) return false;

        let valid = 0;

        selection.forEach((number_and_color) => {
          const [number, color] = number_and_color.split(' ');

          if (!(Number(number) > max[color])) {
            valid += 1;
          }
        });

        return valid === selection.length;
      },
      true
    );

    if (all_selections_possible) {
      sum += i + 1;
    }
  });

  return sum; // 2268
}

console.log('1', p1(lines_from_file('./src/02/input.txt')));

function p2(lines: string[]) {
  const min: Record<string, number> = {
    green: 0,
    red: 0,
    blue: 0,
  };

  let powers: number[] = [];

  lines.forEach((line, i) => {
    const selections_with_cubes_split = get_selections_with_cubes_split(line);

    selections_with_cubes_split.forEach((selection) => {
      selection.forEach((number_and_color) => {
        const [n, color] = number_and_color.split(' ');

        const num = Number(n);

        if (min[color] < num) {
          min[color] = num;
        }
      });
    });

    powers.push(min.green * min.blue * min.red);

    min.green = 0;
    min.red = 0;
    min.blue = 0;
  });

  return powers.reduce((acc, e) => acc + e, 0); // 63542
}

function get_selections_with_cubes_split(line: string) {
  const [_, game_details] = line.split(': '); // [_, 'x color, y color; x color, y color']
  const split_selections = game_details.split('; '); // ['x color, y color', 'x color, y color']
  const selections_with_cubes_split = split_selections.map((e) =>
    e.split(', ')
  ); // [['x color', 'y color', ], ['x color', 'y color']]

  return selections_with_cubes_split;
}

console.log('2', p2(lines_from_file('./src/02/input.txt')));

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest!;

  it('p1', () => {
    expect(p1(lines_from_string(p1_test))).toEqual(8);
  });

  it('p2', () => {
    expect(p2(lines_from_string(p2_test))).toEqual(2286);
  });
}
