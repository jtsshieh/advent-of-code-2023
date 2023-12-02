import { readFile } from 'fs/promises';

async function part1() {
    const data = await readFile('./day-1.input.txt', 'utf-8');

    let sum = 0;
    for (const entry of data.split('\n')) {
        let numbers = '';

        for (let i = 0; i < entry.length; i++) {
            if (entry[i] >= '0' && entry[i] <= '9') {
                numbers += entry[i];
            }
        }

        sum += parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    }

    console.log(`The sum for part 1 is: ${sum}`);
}

part1();

async function part2() {
    const data = await readFile('./day-1.input.txt', 'utf-8');

    const numbers = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    };

    let sum = 0;
    for (const entry of data.split('\n')) {
        const indicies = [];

        for (let i = 0; i < entry.length; i++) {
            if (entry[i] >= '0' && entry[i] <= '9') {
                indicies.push({ index: i, digit: entry[i] });
            }
        }

        for (const [number, digit] of Object.entries(numbers)) {
            let i = entry.indexOf(number);
            while (i != -1) {
                indicies.push({index: i, digit})
                i = entry.indexOf(number, i+1);
            }
        }

        const min = indicies.reduce((prev, cur) => cur.index < prev.index ? cur : prev, indicies[0])
        const max = indicies.reduce((prev, cur) => cur.index > prev.index ? cur : prev, indicies[0])
        sum += parseInt(`${min.digit}${max.digit}`);
    }

    console.log(`The sum for part 2 is: ${sum}`);
}

part2();
