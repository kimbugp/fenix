function fakerun(scriptStr) {
    var output = []
    var lines = scriptStr.split("\n");
    for (idx in lines) {
        let line = lines[idx];

        if (line.length == 11) {
            throw "Random Error!";
        }
        if (line.startsWith('DoThis')) {
            output.push(line.length);
        } else if (line.startsWith('DoThat')) {
            output.push(line.substring(line.length - 4));
        } else if (line.startsWith('DoTheOther')) {
            output.push(line.length % 2);
        } else {
            throw "Not Valid";
        }
    }
    return output;
};

module.exports = fakerun