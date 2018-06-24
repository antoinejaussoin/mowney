var systemUnderTest = require('rewire')('../../../server/repositories/date-range-factory');
var moment = require('moment');
var result;
var format = 'YYYY-MM-DD';

describe('Date Range Factory', function () {

    describe('When today is a random date', function () {

        before(function () {
            systemUnderTest.__set__({
                getToday: function () {
                    return moment('2014-04-19');
                }
            });
        });

        describe('Get Current Month', function () {
            beforeEach(function () {
                result = systemUnderTest.getCurrentMonth();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2014-04-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-04-19');
            });
        });

        describe('Get Last Month', function () {
            beforeEach(function () {
                result = systemUnderTest.getLastMonth();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2014-03-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-03-31');
            });
        });

        describe('Get Last 6 Months', function () {
            beforeEach(function () {
                result = systemUnderTest.getLast6Months();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2013-10-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-03-31');
            });
        });

        describe('Get Last Year', function () {
            beforeEach(function () {
                result = systemUnderTest.getLastYear();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2013-04-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-03-31');
            });
        });

        describe('Get 3 Years', function () {
            beforeEach(function () {
                result = systemUnderTest.get3Years();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2011-04-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-03-31');
            });
        });

        describe('Get Since Inception', function () {
            beforeEach(function () {
                result = systemUnderTest.getSinceInception();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('1900-01-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-04-19');
            });
        });

    });

    describe('When today is the last day of the month and the year', function () {

        before(function () {
            systemUnderTest.__set__({
                getToday: function () {
                    return moment('2014-12-31');
                }
            });
        });

        describe('Get Current Month', function () {
            beforeEach(function () {
                result = systemUnderTest.getCurrentMonth();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2014-12-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-12-31');
            });
        });

        describe('Get Last Month', function () {
            beforeEach(function () {
                result = systemUnderTest.getLastMonth();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2014-11-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-11-30');
            });
        });

        describe('Get Last 6 Months', function () {
            beforeEach(function () {
                result = systemUnderTest.getLast6Months();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2014-06-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-11-30');
            });
        });

        describe('Get Last Year', function () {
            beforeEach(function () {
                result = systemUnderTest.getLastYear();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2013-12-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-11-30');
            });
        });

        describe('Get 3 Years', function () {
            beforeEach(function () {
                result = systemUnderTest.get3Years();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2011-12-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-11-30');
            });
        });

        describe('Get Since Inception', function () {
            beforeEach(function () {
                result = systemUnderTest.getSinceInception();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('1900-01-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-12-31');
            });
        });

    });

    describe('When today is the first day of the month and the year', function () {

        before(function () {
            systemUnderTest.__set__({
                getToday: function () {
                    return moment('2014-01-01');
                }
            });
        });

        describe('Get Current Month', function () {
            beforeEach(function () {
                result = systemUnderTest.getCurrentMonth();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2014-01-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-01-01');
            });
        });

        describe('Get Last Month', function () {
            beforeEach(function () {
                result = systemUnderTest.getLastMonth();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2013-12-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2013-12-31');
            });
        });

        describe('Get Last 6 Months', function () {
            beforeEach(function () {
                result = systemUnderTest.getLast6Months();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2013-07-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2013-12-31');
            });
        });

        describe('Get Last Year', function () {
            beforeEach(function () {
                result = systemUnderTest.getLastYear();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2013-01-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2013-12-31');
            });
        });

        describe('Get 3 Years', function () {
            beforeEach(function () {
                result = systemUnderTest.get3Years();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('2011-01-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2013-12-31');
            });
        });

        describe('Get Since Inception', function () {
            beforeEach(function () {
                result = systemUnderTest.getSinceInception();
            });

            it('should have the correct from date', function () {
                result.from.format(format).should.equal('1900-01-01');
            });

            it('should have the correct to date', function () {
                result.to.format(format).should.equal('2014-01-01');
            });
        });

    });
});