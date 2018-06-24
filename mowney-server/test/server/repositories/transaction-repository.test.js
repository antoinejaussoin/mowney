var systemUnderTest = require('../../../server/repositories/transaction-repository');
var testInit = require('../test-init');
var result;

describe('Transaction Repository', function () {
    before(function (done) {
        testInit(false, done);
    });

    describe('When getting the TimeLine', function () {

        beforeEach(function (done) {
            systemUnderTest.getTimeline({
                id: 1
            }, 'USD').then(function (timeline) {
                result = timeline;
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should return 267 transactions', function () {
            result.length.should.equal(267);
        });
    });

    describe('When getting a range', function () {
        beforeEach(function (done) {
            systemUnderTest.getRange({
                id: 1
            }, 1, new Date(2014, 0, 1), new Date(2014, 1, 1)).then(function (transactions) {
                result = transactions;
                done();
            }, function (err) {
                console.error(err);
                result = null;
                done();
            });
        });

        it('should have some transactions', function () {
            (result != null).should.be.true;
        });
    });

    describe('When getting a total', function () {
        beforeEach(function (done) {
            systemUnderTest.getTotal({
                id: 1
            }, 1).then(function (total) {
                result = total;
                done();
            }, function (err) {
                console.error(err);
                result = null;
                done();
            });
        });

        it('should have calculated a total', function () {
            (result != null).should.be.true;
        });

        it('the total should be correct', function () {
            result.should.equal(9343.83);
        });
    });

    describe('When getting transactions by account id', function () {
        beforeEach(function (done) {
            systemUnderTest.getByAccountId({
                id: 1
            }, 1, 10).then(function (transactions) {
                result = transactions;
                done();
            }, function (err) {
                console.error(err);
                result = null;
                done();
            });
        });

        it('should have returned some transactions', function () {
            (result != null).should.be.true;
        });

        it('should have returned exactly 10 transactions', function () {
            result.length.should.equal(10);
        });
    });

    describe('When saving a new manual transaction', function () {
        var transaction;
        before(function (done) {
            systemUnderTest.saveManualTransaction(100, new Date(2015, 0, 1), 'Test Manual', -123)
                .then(function () {
                    result = true;
                    done();
                }, function (err) {
                    console.error(err);
                    result = false;
                    done();
                });
        });

        before(function (done) {
            systemUnderTest.getByAccountId({
                id: 3
            }, 100, 1000).then(function (transactions) {
                transaction = transactions[0];
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should have saved the new transaction ok', function () {
            result.should.be.true;
        });

        it('should have saved the account correctly', function () {
            transaction.should.not.be.null;
            transaction.accountId.should.equal(100);
        });
        
        it('should not have saved an import', function () {
            (transaction.importId === null).should.be.true;
        });
    });
});