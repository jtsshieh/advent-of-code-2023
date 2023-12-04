import { readFile } from 'fs/promises';


let digits = '1234567890'.split('');
async function part1() {
    const data = await readFile('./day-3.input.txt', 'utf-8');
    const lines = data.split('\n');

    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split('');

        let inNumber = false;
        let number = '';
        for (let j = 0; j < line.length; j++) {
            if (inNumber) {
                if (digits.includes(line[j])) {
                    number += line[j];
                }
                if (!digits.includes(line[j]) || j == (line.length - 1)){
                    inNumber = false;
                    const isLineEnd = j == (line.length - 1);
                    // left
                    const charLeft = isLineEnd && digits.includes(line[j]) ? j - number.length : j-(number.length + 1);
                    if (charLeft >= 0 && line[charLeft] != '.') {
                        sum += Number(number);
                        number = '';
                        continue;
                    }

                    // right
                    if (!isLineEnd && line[j] != '.') {
                        sum += Number(number);
                        number = '';
                        continue;
                    }

                    // top
                    if (i != 0) {
                        let found = false;
                        for (let k = charLeft > -1 ? charLeft : 0; k <= j; k++) {
                            if (lines[i-1][k] != '.' && !digits.includes(line[i-1][k])) {
                                sum += Number(number);
                                found = true;
                                number = '';
                                break;
                            }
                        }
                        if (found == true) continue;
                    }

                    // bottom
                    if ((i + 1) < lines.length) {
                        let found = false;
                        for (let k = charLeft > -1 ? charLeft : 0; k <= j; k++) {
                            if (lines[i+1][k] != '.' && !digits.includes(line[i+1][k])) {
                                sum += Number(number);
                                found = true;
                                number = '';
                                break;
                            }
                        }
                        if (found == true) continue;
                    }

                    number = '';
                }
            } else if (digits.includes(line[j])) {
                inNumber = true;
                number += line[j];
            }
        }

    }

    console.log(`The sum for part 1 is: ${sum}`);
}

part1();

async function part2() {
    const data = await readFile('./day-3.input.txt', 'utf-8');
    const lines = data.split('\n');

    const gears: Record<string, string[]> = {};

    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split('');

        let inNumber = false;
        let number = '';
        for (let j = 0; j < line.length; j++) {
            if (inNumber) {
                if (digits.includes(line[j])) {
                    number += line[j];
                }
                if (!digits.includes(line[j]) || j == (line.length - 1)){
                    inNumber = false;
                    const isLineEnd = j == (line.length - 1);
                    // left
                    const charLeft = isLineEnd && digits.includes(line[j]) ? j - number.length : j-(number.length + 1);
                    if (charLeft >= 0 && line[charLeft] == '*') {
                        if (!gears[`${i},${charLeft}`]) {
                            gears[`${i},${charLeft}`] = [];
                        }
                        gears[`${i},${charLeft}`].push(number);
                    }

                    // right
                    if (!isLineEnd && line[j] == '*') {
                        if (!gears[`${i},${j}`]) {
                            gears[`${i},${j}`] = [];
                        }
                        gears[`${i},${j}`].push(number);
                    }

                    // top
                    if (i != 0) {
                        for (let k = charLeft > -1 ? charLeft : 0; k <= j; k++) {
                            if (lines[i-1][k] == '*') {
                                if (!gears[`${i-1},${k}`]) {
                                    gears[`${i-1},${k}`] = [];
                                }
                                gears[`${i-1},${k}`].push(number);
                            }
                        }
                    }

                    // bottom
                    if ((i + 1) < lines.length) {
                        for (let k = charLeft > -1 ? charLeft : 0; k <= j; k++) {
                            if (lines[i+1][k] == '*') {
                                if (!gears[`${i+1},${k}`]) {
                                    gears[`${i+1},${k}`] = [];
                                }
                                gears[`${i+1},${k}`].push(number);
                            }
                        }
                    }
                    number = '';
                }
            } else if (digits.includes(line[j])) {
                inNumber = true;
                number += line[j];
            }
        }

    }

    for (const [, numbers] of Object.entries(gears)) {
        if (numbers.length == 2) {
            sum += Number(numbers[0]) * Number(numbers[1]);
        }
    }

    console.log(`The sum for part 2 is: ${sum}`);
}

part2();
