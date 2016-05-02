var systemUnderTest = require('../../../server/repositories/account-repository');
var testInit = require('../test-init');
var result;

describe('Account Repository', function () {
    before(function (done) {
        testInit(false, done);
    });

    describe('When getting all accounts, excluding disabled', function () {

        beforeEach(function (done) {
            systemUnderTest.getAll({
                id: 2
            }, false).then(function (accounts) {
                result = accounts;
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should return 4 accounts', function () {
            result.length.should.equal(4);
        });
    });

    describe('When getting all accounts, including disabled', function () {

        beforeEach(function (done) {
            systemUnderTest.getAll({
                id: 2
            }, true).then(function (accounts) {
                result = accounts;
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should return 6 accounts', function () {
            result.length.should.equal(6);
        });
    });

    describe('When getting an account belonging to the correct user', function () {

        beforeEach(function (done) {
            systemUnderTest.getById({
                id: 2
            }, 12).then(function (account) {
                result = account;
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should return an account', function () {
            result.should.not.be.null;
        });

        it('should return the correct account', function () {
            result.name.should.equal('Test Account USD');
        });
    });

    describe('When getting an account belonging to the wrong user', function () {

        beforeEach(function (done) {
            systemUnderTest.getById({
                id: 1
            }, 12).then(function (account) {
                result = account;
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should not return an account', function () {
            (result === null).should.be.true;
        });
    });

    describe('When getting the summary', function () {
        beforeEach(function (done) {
            systemUnderTest.getSummary({
                id: 2
            }, 'GBP').then(function (summary) {
                result = summary;
                done();
            }, function (err) {
                console.error(err);
                done();
            });
        });

        it('should return 1 line per active account', function () {
            result.length.should.equal(4);
        });
    });

});
