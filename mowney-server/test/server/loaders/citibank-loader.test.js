(function () {
    var systemUnderTest = require('../../../server/loaders/citibank-loader').load;
    var utils = require('./loaders-utils');
    var data;
    var result;

    describe('Citibank Loader', function () {

        before(function () {
            data = utils.loadTestFile('citibank-1.csv');
        });

        describe('When loading some CSV data', function () {

            beforeEach(function (done) {
                systemUnderTest(data).then(function (r) {
                    result = r;
                    done();
                }, function (err) {
                    console.log(err);
                    done();
                });
            });

            it('should return a list of items', function () {
                result.length.should.equal(2);
            });

            it('should return the correct date for the first item', function () {
                result[0].date.getFullYear().should.equal(2014);
                result[0].date.getMonth().should.equal(11 - 1);
                result[0].date.getDate().should.equal(28);
            });

            it('should return the correct amount for the first item', function () {
                result[0].amount.should.equal(-42.58);
            });

            it('should return the correct description for the first item', function () {
                result[0].description.should.equal('Foo');
            });
        });

        describe('When loading an empty file', function () {
            beforeEach(function (done) {
                systemUnderTest("").then(function (r) {
                    result = r;
                    done();
                }, function () {
                    done();
                });
            });

            it('should return an empty list', function () {
                result.length.should.equal(0);
            });

        });
    });
})();