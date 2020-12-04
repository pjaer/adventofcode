var fs = require('fs')
var filename = "./input.txt";


const keyBirthYear = 'byr';
const keyIssueYear = 'iyr';
const keyExpirationYear = 'eyr';
const keyHeight = 'hgt';
const keyHairColor = 'hcl';
const keyEyeColor = 'ecl';
const keyPassportID = 'pid';
const keyCountryID = 'cid';

var requiredKeys = [keyBirthYear, keyIssueYear, keyExpirationYear, keyHeight, keyHairColor, keyEyeColor, keyPassportID];

function validatePassport(pp) {
    var keys = pp.pairs.reduce((arr, pair) => { arr.push(pair.key); return arr }, []);

    if(keys.length < requiredKeys.length) return false;

    for(var requiredKey of requiredKeys) {
        if (!keys.includes(requiredKey)) return false;
    }
    return true;
}

var passports = [];
var index = 0;
var prevline = null;
fs.readFileSync(filename, 'utf-8').trim().split('\n').map(line => {

    // Create blank passport
    if (!passports[index]) {
        passports[index] = {
            pairs: [],
            valid: false,
        };
    }

    // new line = new passport
    if(!line.trim()) {

        if(prevline) {
            //  Dont create blank passports for > 1 blank line
            index++;
        }
        return;
    }

    line.split(' ').map(pair => {
        var [key, value] = pair.trim().split(':');
        passports[index].pairs.push({
            key: key,
            value: value,
            required: requiredKeys.includes(key)
        });
    })

    prevline = line;
});

// Validate all passports
passports.map(p => p.valid = validatePassport(p))
var validPassports = passports.filter(p => p.valid).length;

// Echo result
console.log(`Found ${validPassports} valid passports`);
