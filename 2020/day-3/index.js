var fs = require('fs')
var filename = "./input.txt";


var map = [];
// Generate a map row where trees are true, and spaces are false
var inputMap = fs.readFileSync(filename, 'utf-8').trim().split('\n').map(line => {
    var treeMap = line.split('').map(c => c == '#')
    map.push(treeMap)
})

function isDone(x, y) {
    return y >= map.length;
};

function isTree(x, y) {
    var realx = x % map[y].length;
    return map[y][realx];
}


function testSlopeForTrees(rightspeed, downspeed) {
    var x = y = 0;
    var trees = 0;

    while (!isDone(x, y)) {
        if (isTree(x, y)) {
            trees++;
        }
        x += rightspeed;
        y += downspeed;
    }
    console.log(`Testing slope (${downspeed}, ${rightspeed}), ended up in pos (${x}, ${y}) hitting ${trees} trees`)
    return trees;
}

var part1 = testSlopeForTrees(3,1)
console.log(`Part 1: encountered ${part1} trees\n`)

var part2 = [
    testSlopeForTrees(1,1),
    testSlopeForTrees(3,1),
    testSlopeForTrees(5,1),
    testSlopeForTrees(7,1),
    testSlopeForTrees(1,2)
].reduce((v, a) => v * a)
console.log(`Total sum of multipled trees are: ${part2}\n`)
