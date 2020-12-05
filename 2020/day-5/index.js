var fs = require('fs')
var filename = "./input.txt";

var rows = 128;
var cols = 8;

const locator = (max, steps) => {
    return steps.reduce((seat,step) => {

        if (step == 'B' || step == 'R') {
            // keep upper halv: 4-7
            seat[0] += ((seat[1]+1)-seat[0])/2;
        }
        if (step == 'F' || step == 'L') {
            seat[1] -= ((seat[1]+1)-seat[0])/2;
        }
        return seat;
    }, [0, max])[0];
}

var seats = fs.readFileSync(filename, 'utf-8').trim().split('\n').reduce((acc, line) => {
    line = line.trim();
    if (!line.length == 10) return;

    map = line.trim().split('');
    var seat = {
        org: line,
        row: locator(127, map.splice(0,7)),
        col: locator(7, map),
        id: null
    }
    seat.id = seat.row * 8 + seat.col
    acc.push(seat)
    return acc
},[]);

console.log(seats)

console.log("Highest: " + seats.reduce((max, seat) => seat.id > max ? seat.id : max, 0));
