const text = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
......1000
.........*`

const lines = text.split('\n')
let sum = 0;

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++){
    let line = lines[lineIndex];
    extractNumbersFromLine(line, lineIndex)
    console.log("Sum " + (lineIndex + 1) + " " +  sum)
}

function extractNumbersFromLine(line: string, lineIndex: number) {
    let number = "";
    let startingIndex = 0;


    for (let charIndex = 0; charIndex < line.length; charIndex++) {
        let char = parseInt(line[charIndex])
        if (!isNaN(parseInt(line[charIndex])) && number.length === 0) {
            number += char
            startingIndex = charIndex;
        }

        else if (!isNaN(parseInt(line[charIndex])) && number.length > 0) {
            number += char
        }

        if (isNaN(parseInt(line[charIndex])) && number.length > 0) {
            if (lineIndex === 0) {
                if (isNumbersEndIndexContainsSymbol(line, number, startingIndex) || isNumbersStartIndexContainsSymbol(line, number, startingIndex)) {
                    sum += +number
                } else {
                    for (let j = startingIndex - 1; j <= startingIndex + number.length; j++) {
                        if (isCharIsASymbol(lines, lineIndex, j)) {
                            sum += +number;
                            break;
                        }
                    }
                }
            } else if (lineIndex < lines.length - 1) {
                if (isNumbersEndIndexContainsSymbol(line, number, startingIndex) || isNumbersStartIndexContainsSymbol(line, number, startingIndex)) {
                    sum += +number
                } else {
                    for (let k = startingIndex - 1; k <= startingIndex + number.length; k++) {
                        if (isCharIsASymbol(lines, lineIndex, k) || isCharIsASymbolReverse(lines, lineIndex, k)) {
                            sum += +number;
                            break;
                        }
                    }
                }
            } else {
                if (isNumbersEndIndexContainsSymbol(line, number, startingIndex) || isNumbersStartIndexContainsSymbol(line, number, startingIndex)) {
                    sum += +number
                } else {
                    for (let y = startingIndex - 1; y <= startingIndex + number.length; y++) {
                        if (isCharIsASymbolReverse(lines, lineIndex, y)) {
                            sum += +number;
                            break;
                        }
                    }
                }
            }

            number = "";
            startingIndex = 0
        }
    }
}

function isNumbersEndIndexContainsSymbol(line: string, number: string, startingIndex: number) {
    const charAfterNumber = line[startingIndex + number.length]
    const result = charAfterNumber && charAfterNumber !== '.' && isNaN(parseInt(charAfterNumber))
    return result
}
function isNumbersStartIndexContainsSymbol(line: string, number: string, startingIndex: number) {
    const charBeforeNumber = line[startingIndex - 1]
    const result = charBeforeNumber && line[startingIndex - 1] !== "." && isNaN(parseInt(charBeforeNumber))
    return result
}

function isCharIsASymbol(lines: string[], lineIndex: number, charIndex: number) {
    const char = lines[lineIndex + 1][charIndex];
    const result = char && char !== '.' && isNaN(parseInt(char))
    return result;
}

function isCharIsASymbolReverse(lines: string[], lineIndex: number, charIndex: number) {
    const char = lines[lineIndex - 1][charIndex];
    const result = char && char !== '.' && isNaN(parseInt(char))
    return result;
}
