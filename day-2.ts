import { readFile } from 'fs/promises';

async function part1() {
    const data = await readFile('./day-2.input.txt', 'utf-8');
    const games = data.split('\n');

    const quota: Record<string, number> = {
        'red': 12,
        'green': 13,
        'blue': 14
    }

    let sum = 0;
    for (let i = 0; i < games.length; i++) {
        let text = games[i].split(':')[1].split(';');
        let impossible = false;
        for (const roll of text) {
            for (const clause of roll.trim().split(',')) {
                const [count, color] = clause.trim().split(' ');
                if (quota[color] < Number(count)) {
                    impossible = true;
                }
            }
        }

        if (!impossible) sum += (i+1);
    }

    console.log(`The sum for part 1 is: ${sum}`);
}

part1();

async function part2() {
    const data = await readFile('./day-2.input.txt', 'utf-8');
    const games = data.split('\n');

    let sum = 0;
    for (let i = 0; i < games.length; i++) {
        let text = games[i].split(':')[1].split(';');
        const minAmounts: Record<string, number> = {
            red: 0,
            green: 0,
            blue: 0
        }
        for (const roll of text) {
            for (const clause of roll.trim().split(',')) {
                const [count, color] = clause.trim().split(' ');
                if (Number(count) > minAmounts[color]) {
                    minAmounts[color] = Number(count);
                }
            }
        }

        sum += (minAmounts.red * minAmounts.green * minAmounts.blue);
    }


    console.log(`The sum for part 2 is: ${sum}`);
}

part2();
