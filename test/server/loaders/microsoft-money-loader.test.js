(function () {
    var systemUnderTest = require('../../../server/loaders/microsoft-money-loader').load;
    var utils = require('./loaders-utils');
    var data;
    var empty;
    var result;

    describe('Microsoft Money Loader', function () {

        before(function () {
            data = utils.loadTestFile('microsoft-money-1.ofx');
            empty = utils.loadTestFile('microsoft-money-empty.ofx');
        });

        describe('When loading some XML data', function () {

            beforeEach(function (done) {
                systemUnderTest(data).then(function (r) {
                    result = r;
                    done();
                }, function () {
                    done();
                });
            });

            it('should return a list of items', function () {
                result.length.should.equal(5);
            });

            it('should return the correct date for the first item', function () {
                result[0].date.getFullYear().should.equal(2015);
                result[0].date.getMonth().should.equal(1 - 1);
                result[0].date.getDate().should.equal(2);
            });

            it('should return the correct amount for the first item', function () {
                result[0].amount.should.equal(123.20);
            });

            it('should return the correct description for the first item', function () {
                result[0].description.should.equal('Foo');
            });

            it('should trim the description', function () {
                result[3].description.should.equal('Glap');
            });
        });

        describe('When loading an empty file', function () {
            beforeEach(function (done) {
                systemUnderTest(empty).then(function (r) {
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