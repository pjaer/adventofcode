var inputArray = require('./input');
var finds = [];

// Sort the list because performance man
inputArray.sort();

function part1(inp) {
    var iterations = 0;

    for (var a = 0; a < inp.length; a += 1) {
        if (inp[a] > 2020) continue;

        for (var b = inp.length - 1; b > a; b -= 1) {
            if (inp[a] + inp[b] > 2020) continue;

            iterations++;
            if (inp[a] + inp[b] === 2020) {
                console.log("Found match after " + iterations + " iterations");
                return [inp[a], inp[b]];
            }
        }
    }
}

function part2(inp) {
    var iterations = 0;

    for (var a = 0; a < inp.length; a += 1) {
        if (inp[a] > 2020) continue;

        for (var b = a; b < inp.length; b += 1) {
            if (inp[a] + inp[b] > 2020) continue;

            for (var c = b; c < inp.length; c += 1) {

                iterations++;
                if (inp[a] + inp[b] + inp[c] === 2020) {
                    console.log("Found match after " + iterations + " iterations");
                    return [inp[a], inp[b], inp[c]];
                }
            }
        }
    }
}

// -----------------
// Run part 1
// -----------------
console.log("-- Running part 1");
console.time('Part 1 execution time');
if (finds = part1(inputArray)) {
    var sum = finds.reduce((a,b) => a * b, 1);
    console.log("Found match: " + finds.join(' & ') + " with sum of: " + sum);
}
else {
    console.log("Program dit not complete the mission");
}
// Print execution time
console.timeEnd('Part 1 execution time');

// -----------------
// Run part 2
// -----------------
console.log("-- Running part 2");
console.time('Part 2 execution time');
if (finds = part2(inputArray)) {
    var sum = finds.reduce((a,b) => a * b, 1);
    console.log("Found match: " + finds.join(' & ') + " with sum of: " + sum);
}
else {
    console.log("Program dit not complete the mission");
}
// Print execution time
console.timeEnd('Part 2 execution time');
