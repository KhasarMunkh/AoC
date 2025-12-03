import fs from "fs";

const path = "input";

function getBanks(path: string) {
    const input = fs.readFileSync(path, "utf8").trim();
    const banks = input.split("\n");
    return banks;
}

function solution() {
    const banks = getBanks(path);
    let answer = 0;
    for (const bank of banks) {
        let output = findMaxBankJoltage(bank, 12);
        let joinedOutput = output.join('');
        answer += parseInt(joinedOutput);
    }
    console.log(answer);
}

function findMaxBankJoltage(s: string, numDigits: number = 2) {
    let output: string[] = [];
    let lastValidIndex = -1;
    let temp = { val: -1, index: -1 };
    while (output.length < numDigits) {
        let maxIndex = s.length + 1 - numDigits + output.length - 1;
        for (let i = lastValidIndex + 1; i <= maxIndex; i++) {
            let curr = parseInt(s[i]!);
            if (curr > temp.val) {
                temp.val = curr;
                temp.index = i;
            }
        }
        output.push(temp.val.toString());
        temp.val = -1;
        lastValidIndex = temp.index;
    }
    return output;
}
solution();
