var _ = require('lodash');

module.exports = function (text, skip) {
    var lines = text.split('\n');
    lines.splice(0, skip);
    return lines.join('\n');
}