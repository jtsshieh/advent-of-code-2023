import { readFile } from 'fs/promises';


async function part1() {
    const data = await readFile('./day-4.input.txt', 'utf-8');
    const lines = data.split('\n');
    let sum = 0;

    for (const line of lines) {
        const [first, second] = line
                                    .split(':')[1].trim()
                                    .split('|')
                                    .map((part) => part.trim().split(/\s+/).map(Number));
        const common: number[] = [];
        for (const number of first) {
            if (second.includes(number)) common.push(number);
        }

        sum += common.length == 0 ? 0 : 2**(common.length-1);
    }
    console.log(`The sum for part 1 is: ${sum}`);
}

part1();

async function part2() {
    const data = await readFile('./day-4.input.txt', 'utf-8');
    const lines = data.split('\n');

    const matchTable: number[] = [];

    for (const line of lines) {
        const [first, second] = line
            .split(':')[1].trim()
            .split('|')
            .map((part) => part.trim().split(/\s+/).map(Number));

        const common: number[] = [];
        for (const number of first) {
            if (second.includes(number)) common.push(number);
        }

        matchTable.push(common.length)
    }

    const cards = new Array(matchTable.length).fill(1);
    for (let i = 0; i < matchTable.length; i++) {
        // console.log(Math.min(matchTable[i], matchTable.length - i - 1));
        for (let j = 1; j <= Math.min(matchTable[i], matchTable.length-i-1); j++) {
            cards[i+j] += cards[i];
        }
        console.log(cards, matchTable)
    }
    const sum = cards.reduce((prev, cur) => cur + prev, 0);

    console.log(`The sum for part 2 is: ${sum}`);
}

part2();
