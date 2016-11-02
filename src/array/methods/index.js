const path = require('path');
const methodifyAllInDir = require('../../meta/methodify-all-in-dir');

module.exports = methodifyAllInDir(path.join(__dirname, '..'),
                                   { exclude: path.basename(__dirname) });