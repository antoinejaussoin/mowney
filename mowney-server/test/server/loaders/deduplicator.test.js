(function () {
    var systemUnderTest = require('../../../server/loaders/deduplicator');
    var ImportedTransaction = require('../../../server/loaders/imported-transaction');
    var result;
    var existingTransactions;
    var newTransactions;

    describe('Deduplicator', function () {

        beforeEach(function () {
            existingTransactions = [];
            newTransactions = [];
        });

        describe('When there are no existing transactions', function () {
            beforeEach(function () {
                newTransactions.push(new ImportedTransaction(new Date(), 'foo', 123));
                newTransactions.push(new ImportedTransaction(new Date(), 'bar', 456));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return all the new transactions', function () {
                result.length.should.equal(2);
            });

            it('should return the correct transactions', function () {
                result[0].description.should.equal('foo');
                result[1].description.should.equal('bar');
            });
        });

        describe('When there are no new transactions', function () {
            beforeEach(function () {
                existingTransactions.push(new ImportedTransaction(new Date(), 'foo', 123));
                existingTransactions.push(new ImportedTransaction(new Date(), 'bar', 456));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return an empty list', function () {
                result.length.should.equal(0);
            });

        });

        describe('When there are no duplicates', function () {
            beforeEach(function () {
                existingTransactions.push(new ImportedTransaction(new Date(), 'foo', 123));
                existingTransactions.push(new ImportedTransaction(new Date(), 'bar', 456));
                newTransactions.push(new ImportedTransaction(new Date(), 'fizz', 789));
                newTransactions.push(new ImportedTransaction(new Date(), 'buzz', 101112));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return all the new transactions', function () {
                result.length.should.equal(2);
            });

            it('should return the correct transactions', function () {
                result[0].description.should.equal('fizz');
                result[1].description.should.equal('buzz');
            });

        });

        describe('When there are duplicates', function () {
            beforeEach(function () {
                existingTransactions.push(new ImportedTransaction(new Date('Wed Dec 31 2014 14:28:31 GMT+0100 (CET)'), 'foo', 123));
                existingTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'bar', 456));
                newTransactions.push(new ImportedTransaction(new Date('Wed Dec 31 2014 14:28:31 GMT+0100 (CET)'), 'foo', 123));
                newTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'buzz', 101112));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return all the new transactions that didnt exist before', function () {
                result.length.should.equal(1);
            });

            it('should return the correct transactions', function () {
                result[0].description.should.equal('buzz');
            });

        });

        describe('When there are duplicates, same date and amount but different description', function () {
            beforeEach(function () {
                existingTransactions.push(new ImportedTransaction(new Date(2014, 0, 1), 'foo', 123));
                existingTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'bar', 456));
                newTransactions.push(new ImportedTransaction(new Date(2014, 0, 1), 'foo2', 123));
                newTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'buzz', 101112));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return all the new transactions that didnt exist before', function () {
                result.length.should.equal(1);
            });

            it('should return the correct transactions', function () {
                result[0].description.should.equal('buzz');
            });

        });

        describe('When two items seems the same but with different dates', function () {
            beforeEach(function () {
                existingTransactions.push(new ImportedTransaction(new Date(2014, 0, 1), 'foo', 123));
                existingTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'bar', 456));
                newTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'foo', 123));
                newTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'buzz', 101112));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return all the new transactions that didnt exist before (if different date, then different transaction)', function () {
                result.length.should.equal(2);
            });

            it('should return the correct transactions', function () {
                result[0].description.should.equal('foo');
                result[1].description.should.equal('buzz');
            });

        });
        
        describe('When there are duplicates, different time zone', function () {
            beforeEach(function () {
                existingTransactions.push(new ImportedTransaction('Wed Dec 31 2014 00:00:00 GMT+0100 (CET)', 'foo', 123));
                existingTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'bar', 456));
                newTransactions.push(new ImportedTransaction('Wed Dec 31 2014 01:00:00 GMT+0100 (CET)', 'foo2', 123));
                newTransactions.push(new ImportedTransaction(new Date(2014, 0, 2), 'buzz', 101112));
                result = systemUnderTest(existingTransactions, newTransactions);
            });

            it('should return all the new transactions that didnt exist before', function () {
                result.length.should.equal(1);
            });

            it('should return the correct transactions', function () {
                result[0].description.should.equal('buzz');
            });

        });

    });
})();