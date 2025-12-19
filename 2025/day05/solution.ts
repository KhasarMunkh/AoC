import fs, { readFileSync } from "fs";

const path = "input";

type Range = {
    start: bigint;
    end: bigint;
};

function getData(path: string) {
    const input = readFileSync(path, "utf-8").trim();
    const [rangeBlock, idsBlock] = input.split(/\n\s*\n/);
    return [rangeBlock, idsBlock];
}

function getRanges(s: string): Range[] {
    const ranges = s.split("\n").map((line) => {
        const [start, end] = line.split("-").map(BigInt);
        return { start, end };
    });
    return ranges;
}

// sort ranges from start ascending (if tie, end ascending)
function sortRanges(r: Range[]) {
    r.sort((a, b) => {
        if (a.start > b.start) return 1;
        if (a.start < b.start) return -1;
        // a.start === b.start
        if (a.end > b.end) return 1;
        if (a.end < b.end) return -1;
        return 0;
    });
}

function mergeRanges(r: Range[]): Range[] {
    const merged: Range[] = [];
    let curr = { ...r[0] };
    for (let i = 1; i < r.length; i++) {
        const next = r[i];
        if (next.start <= curr.end) {
            // overlapping
            if (curr.end < next.end) {
                // next extends past current range
                curr.end = next.end;
            }
        } else {
            merged.push(curr);
            curr = { ...next };
        }
    }
    merged.push(curr);
    return merged;
}

function isFresh(id: bigint, merged: Range[]): boolean {
    let lo = 0;
    let hi = merged.length - 1;
    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (id >= merged[mid].start && id <= merged[mid].end) {
            return true;
        }
        if (id < merged[mid].start) {
            hi = mid - 1;
        }
        if (id > merged[mid].end) {
            lo = mid + 1;
        }
    }
    return false;
}

function part1() {
    const [rangeBlock, idsBlock] = getData(path);
    const ranges = getRanges(rangeBlock);
    sortRanges(ranges);
    const merged = mergeRanges(ranges);
    const ids = idsBlock.split("\n");
    let count = 0;
    for (const id of ids) {
        if (isFresh(BigInt(id), merged)) {
            count++;
        }
    }
    return count;
}

function part2() {
    const [rangeBlock, idsBlock] = getData(path);
    const ranges = getRanges(rangeBlock);
    sortRanges(ranges);
    const merged = mergeRanges(ranges);
    let count : bigint = 0n;
    for (const range of merged) {
        count = count + range.end - range.start + 1n // INCLUSIVE
    }
    return count;
}

console.log(part1())
console.log(part2())
