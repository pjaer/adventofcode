var fs = require('fs');
var filename = "./input.txt";

var input = fs.readFileSync(filename, 'utf-8').trim().split('\n').map(v => {
    var halfs = v.split(':');
    var password = halfs[1].trim();
    var [limits, character] = halfs[0].split(' ').map(v => v.trim());
    var [min,max] = limits.split('-').map(v => +v);
    return {min, max, character, password};
});

for(var i of input) {
    var occurs = i.password.split('').filter(v => v == i.character).length;
    i.simpleValidation = occurs <= i.max && occurs >= i.min;

    var checkone = i.password[i.min-1] == i.character;
    var checktwo = i.password[i.max-1] == i.character;
    i.advancedValid = [checkone, checktwo].filter(v => v).length == 1;

}

var partOneCount = input.filter(val => val.simpleValidation).length;
var partTwoCount = input.filter(val => val.advancedValid).length;

console.log("Part 1: " + partOneCount +" of " + input.length + " are valid");
console.log("Part 2: " + partTwoCount +" of " + input.length + " are valid");
