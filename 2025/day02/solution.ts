import fs from "fs";

const path = "input";

function solution() {
    let input: string[][] = []
    const ranges = readInput(path)
    ranges.forEach( (range) => {
        let temp = range.split('-')
        input.push(temp)
    })
    console.log(input)
    input.forEach( (x) => {
        console.log(x)
    })
}

function readInput(path: string) {
    const data = fs.readFileSync(path, "utf8").trim();
    const ranges = data.split(",");
    return ranges
}

function filterOddDigit(s: string[]): {
    const first = s[0]
}

function checkInvalid(range: string[]): boolean {
}

solution()
