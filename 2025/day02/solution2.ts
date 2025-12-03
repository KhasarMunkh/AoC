import fs from "fs";

const path = "input";
const testPath = "testinput";

function solution() {
    let input: string[][] = [];
    let output = 0;
    const ranges = readInput(path);
    ranges.forEach((range) => {
        let temp = range.split("-");
        input.push(temp);
    });
    input.forEach((input) => {
        let invalidArr = findInvalid(input);
        for (const i in invalidArr) {
            output += invalidArr[i]!;
        }
    });
    console.log(output);
}

function findInvalid(s: string[]): number[] {
    let lo = parseInt(s[0]!);
    let hi = parseInt(s[1]!);
    let output = [];
    while (lo <= hi) {
        if (isInvalid(lo)) {
            output.push(lo);
        }
        lo++;
    }
    // console.log(output)
    return output;
}

function isInvalid(num: number): boolean {
    let numStr = num.toString();
    let len = numStr.length;
    const x = numStr.slice(0, len / 2);
    const y = numStr.slice(len / 2, len);
    if (x === y) {
        return true;
    }
    for (let parts = 2; parts <= len; parts++) {
        let invalidFlag = true
        const part = numStr.slice(0, len/parts)
        const partLen = len / parts
        for (let i = 1; i < parts; i++) {
            let start = partLen * i
            if (part !== numStr.slice(start, start + partLen)) {
                invalidFlag = false
                break;
            }
        }
        if (invalidFlag) {
            return true
        }
    }
    return false;
}

function readInput(path: string) {
    const data = fs.readFileSync(path, "utf8").trim();
    const ranges = data.split(",");
    return ranges;
}

solution();
