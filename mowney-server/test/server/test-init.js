var models = require('../../server/models');
var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || "development";
var initialised = false;
var sequelize = models.sequelize;

function init(force, done) {
    if (env != 'test') {
        console.error('Cant reset for test on a non test env');
        return done(null, 'Cant reset for test on a non test env');
    }

    if (force || !initialised) {
        initialised = true;
        models.init();
        sequelize.sync({
            force: true
        }).then(function () {
            var testData = fs.readFileSync(path.join(__dirname, 'test-data.sql'), {
                encoding: 'utf8'
            });

            var fakeData = fs.readFileSync(path.join(__dirname, 'fake-data.sql'), {
                encoding: 'utf8'
            });

            var allData = testData + '\n' + fakeData;

            sequelize.query(allData).then(function () {
                done();
            }, function (err) {
                console.error(err);
                done();
            });

        });
    } else {
        done();
    }
}

module.exports = init;
