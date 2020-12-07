const { readFile } = require('fs').promises;

readFile('./2.txt', 'utf8').then(text => {
    const re = /([0-9]+)-([0-9]+) ([A-z]): (.*)/;
    const isPasswordValid = ([, min, max, char, value]) => {
        const count = value.length - value.replace(RegExp(char, 'g'), '').length;
        return count >= min && count <= max;
    }
    const parsed = text.split('\n')
        .map(line => re.exec(line));
    const valid1 = parsed.filter(isPasswordValid);
    console.log(valid1.length);

    const isPasswordValid2 = ([, pos1S, pos2S, char, value]) => {
        const pos1 = Number(pos1S) - 1;
        const pos2 = Number(pos2S) - 1;
        return (value.charAt(pos1) === char && value.charAt(pos2) !== char) || value.charAt(pos1) !== char && value.charAt(pos2) === char;
    }
    const valid2 = parsed.filter(isPasswordValid2);
    console.log(valid2.length);
});