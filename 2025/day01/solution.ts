import fs from "fs";

class Dial {
    pos: number = 50;
    zeros: number = 0;
    constructor(pos = 50) {
        this.pos = pos;
    }
    l() {
        let newPos = this.pos - 1;
        if (newPos === 0) {
            this.zeros++;
        }
        if (newPos < 0) {
            this.pos = 99;
        } else {
            this.pos = newPos;
        }
    }
    r() {
        let newPos = this.pos + 1;
        if (newPos === 0) {
            if (newPos === 0) {
                this.zeros++;
            }
        }
        if (newPos > 99) {
            this.pos = 0;
            this.zeros++;
        } else {
            this.pos = newPos;
        }
    }
}
function solution() {
    const dial = new Dial();
    const path = "input";
    let lines = readInput(path);
    for (const line of lines) {
        const dir = line[0];
        const num = parseInt(line.slice(1));
        if (dir === "L") {
            for (let i = 0; i < num; i++) {
                dial.l();
            }
        }
        if (dir === "R") {
            for (let i = 0; i < num; i++) {
                dial.r();
            }
        }
    }
    return dial.zeros;
}

function test() {
    let zeroCounter: number = 0;
    const dial = new Dial(5);
    console.log(`Starting at pos: ${dial.pos}`);
    const data = readInput("input");
    const lines = data.slice(0, 5);
    for (const line of lines) {
        console.log(line);
        const dir = line[0];
        const num = parseInt(line.slice(1));
        if (dir === "L") {
            for (let i = 0; i < num; i++) {
                dial.l();
            }
        }
        if (dir === "R") {
            for (let i = 0; i < num; i++) {
                dial.r();
            }
        }
        console.log(`Dial pos at: ${dial.pos}`);
        if (dial.pos === 0) {
            zeroCounter++;
        }
    }
    return dial.zeros;
}

console.log(solution())

// let zeros = test();
// console.log(zeros);

function readInput(path: string) {
    const data = fs.readFileSync(path, "utf8").trim();
    const lines = data.split("\n").filter(Boolean);
    // print first 5 lines
    // console.log("First 5 lines of input:");
    // console.log(lines.slice(0, 5));
    // const line = lines[0]
    // console.log(line);
    // console.log(line[0]);
    // console.log(line.slice(1));
    return lines;
}
