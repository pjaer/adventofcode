var fs = require('fs')
var filename = "./input.txt";


/**
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
 */
const keyBirthYear = 'byr';
const keyIssueYear = 'iyr';
const keyExpirationYear = 'eyr';
const keyHeight = 'hgt';
const keyHairColor = 'hcl';
const keyEyeColor = 'ecl';
const keyPassportID = 'pid';
const keyCountryID = 'cid';

const validators = {
    [keyBirthYear]: (v) => /\d{4}/.test(v) ? +v >= 1920 && +v <= 2002 : false,
    [keyIssueYear]: (v) => /\d{4}/.test(v) ? +v >= 2010 && +v <= 2020 : false,
    [keyExpirationYear]: (v) => /\d{4}/.test(v) ? +v >= 2020 && +v <= 2030 : false,
    [keyHeight]: (v) => {
        if (/\d*cm/.test(v)) {
            var m = +(v.replace(/\D/g,''))
            return m >= 150 && m <= 193
        }
        if (/\d*in/.test(v)) {
            var m = +(v.replace(/\D/g,''))
            return m >= 59 && m <= 76
        }
        return false
    },
    [keyHairColor]: (v) => /^\#[0-9a-f]{6}$/.test(v),
    [keyEyeColor]: (v) => ['amb','blu','brn','gry','grn','hzl','oth'].includes(v),
    [keyPassportID]: (v) => /\d{9}/.test(v) && v.length == 9
}

var requiredKeys = [keyBirthYear, keyIssueYear, keyExpirationYear, keyHeight, keyHairColor, keyEyeColor, keyPassportID];

function validatePassport(pp) {
    // Get all keys for this passport
    var keys = pp.pairs.reduce((arr, pair) => { arr.push(pair.key); return arr }, []);
    // If they're fewer than the required, we're missing required keys and fail
    if (keys.length < requiredKeys.length) return false;

    for(var requiredKey of requiredKeys) {
        // Has to have all keys
        if (!keys.includes(requiredKey)) return false;

        // Validate the keys value
        var value = pp.pairs.find(pair => pair.key == requiredKey).value;
        if ( !validators[requiredKey](value)) {
            return false;
        }
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
    if (!line.trim()) {

        if (prevline) {
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
